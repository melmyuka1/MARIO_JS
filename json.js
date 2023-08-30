document.addEventListener("DOMContentLoaded", function() {
    const btnProsseguir = document.getElementById("btnProsseguir");
    const inputNome = document.getElementById("inputNome");

    inputNome.addEventListener("input", function() {
        if (inputNome.value.trim() !== "") {
            btnProsseguir.disabled = false;
        } else {
            btnProsseguir.disabled = true;
        }
    });

    btnProsseguir.addEventListener("click", function() {
        const nome = inputNome.value;

        if (nome.trim() !== "") {
            const jogador = {
                nome: nome,
                score: 0,
                lastscore: 0,
                id: Math.floor(Math.random() * 1000) 
            };
            
            console.log("Jogador antes de enviar:", jogador);
            
            localStorage.setItem("jogador", JSON.stringify(jogador));

            fetch("http://localhost:3333/crud.html", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(jogador)
            })
            .then(response => response.json())
            .then(data => {
                console.log("Data inserted successfully:", data);
                window.location.href = "http://localhost:3333/mario";
            })
            .catch(error => {
                console.error("Error inserting data:", error);
            });
        } else {
            alert("Por favor, insira um nome válido.");
        }
    });
});

   
