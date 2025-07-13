document.getElementById("payBtn").onclick = async () => {
  const name = document.getElementById("name").value || "Anonymous";
  const amount = document.getElementById("amount").value;
  const message = document.getElementById("message").value;
  const uid = "demo_streamer_uid"; // replace with dynamic if needed

  const res = await fetch("/api/createOrder", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, amount, message, uid })
  });

  const data = await res.json();
  if (data.payment_link) {
    window.location.href = data.payment_link;
  } else {
    alert("Payment creation failed");
  }
};
