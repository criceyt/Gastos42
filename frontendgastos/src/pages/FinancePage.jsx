import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "./Dashboard.css";

const FinancePage = () => {
  const [money, setMoney] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [newCurrencyName, setNewCurrencyName] = useState("");
  const [amount, setAmount] = useState(0);
  const [operation, setOperation] = useState("INCOME"); // INCOME o WITHDRAW
  const [type, setType] = useState("LIQUID");
  const token = localStorage.getItem("token");

  // Traer info del usuario
  useEffect(() => {
    axios
      .get("http://localhost:8081/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch((err) => console.error("Error fetching user:", err));
  }, [token]);

  // Traer monedas del usuario
  useEffect(() => {
    if (!user) return;

    axios
      .get("http://localhost:8081/money/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setMoney(res.data);
        if (res.data.length > 0) setSelectedCurrency(res.data[0].name);
      })
      .catch((err) => console.error("Error fetching money:", err));
  }, [user, token]);

  // Manejar envío de formulario
  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!user) return;

  try {
    const deltaAmount = operation === "WITHDRAW" ? -Math.abs(amount) : Math.abs(amount);

    const endpoint =
      operation === "INCOME"
        ? `http://localhost:8081/money/deposit/${user.id}`
        : `http://localhost:8081/money/withdraw/${user.id}`;

    const data = {
      name: newCurrencyName.trim() !== "" ? newCurrencyName : selectedCurrency,
      type,
      amount: deltaAmount,
    };

    const res = await axios.post(endpoint, data, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Actualizar estado localmente
    setMoney((prev) => {
      const exists = prev.find((m) => m.name === data.name);
      if (exists) {
        return prev.map((m) =>
          m.name === data.name ? { ...m, amount: m.amount + deltaAmount } : m
        );
      } else {
        return [...prev, res.data];
      }
    });

    setAmount(0);
    setNewCurrencyName("");
    alert("Operación realizada con éxito!");
  } catch (err) {
    console.error("Error al actualizar dinero:", err);
    alert("Hubo un error al realizar la operación");
  }
};


  // Filtrar monedas existentes únicas
// Filtrar monedas existentes únicas y con amount > 0
const uniqueMoney = Array.from(new Set(money.map((m) => m.name)))
  .map((name) => money.find((m) => m.name === name))
  .filter((m) => m.amount > 0); // <-- solo monedas con amount > 0


  return (
    <div className="dashboard-container d-flex">
      <Sidebar />
      <div className="dashboard-main flex-fill">
        <Header money={money} user={user} />
        <div className="dashboard-content">
          <div className="cards-row justify-center">
            <div className="card finance-card">
              <h2>Gestionar Finanzas</h2>
              <form className="finance-form" onSubmit={handleSubmit}>
                <label>
                  Nueva moneda (opcional):
                  <input
                    type="text"
                    value={newCurrencyName}
                    onChange={(e) => setNewCurrencyName(e.target.value)}
                  />
                </label>

                {newCurrencyName.trim() === "" && uniqueMoney.length > 0 && (
                  <label>
                    Moneda existente:
                    <select
                      value={selectedCurrency}
                      onChange={(e) => setSelectedCurrency(e.target.value)}
                    >
                      {uniqueMoney.map((m) => (
                        <option key={m.id} value={m.name}>
                          {m.name} ({m.amount})
                        </option>
                      ))}
                    </select>
                  </label>
                )}

                {newCurrencyName.trim() !== "" && (
                  <label>
                    Tipo:
                    <select value={type} onChange={(e) => setType(e.target.value)}>
                      <option value="LIQUID">Liquidez</option>
                      <option value="CRYPTO">Cripto</option>
                      <option value="FUND">Fondo</option>
                    </select>
                  </label>
                )}

                <label>
                  Cantidad:
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    required
                  />
                </label>

                <label>
                  Operación:
                  <select
                    value={operation}
                    onChange={(e) => setOperation(e.target.value)}
                  >
                    <option value="INCOME">Ingreso</option>
                    <option value="WITHDRAW">Retirada</option>
                  </select>
                </label>

                <button type="submit">Confirmar</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancePage;
