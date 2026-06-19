let profissionais = [
    {
        nickname: "@pedreirotop",
        categoria: "Pedreiro / Reformas",
        cidade: "Reserva - PR",
        whatsapp: "42999999999",
        descricao: "Faço pisos, calçadas, muros, reformas e pequenos reparos.",
        fotoPrincipal: "https://images.unsplash.com/photo-1503387762-592deb58ef4e",
        fotos: [
            "https://images.unsplash.com/photo-1503387762-592deb58ef4e",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
        ]
    },
    {
        nickname: "@beleza_da_ana",
        categoria: "Manicure / Beleza",
        cidade: "Reserva - PR",
        whatsapp: "42988888888",
        descricao: "Atendimento com unhas decoradas, esmaltação e alongamento.",
        fotoPrincipal: "https://images.unsplash.com/photo-1604654894610-df63bc536371",
        fotos: [
            "https://images.unsplash.com/photo-1604654894610-df63bc536371",
            "https://images.unsplash.com/photo-1519014816548-bf5fe059798b"
        ]
    }
];

function mostrarProfissionais(lista = profissionais) {
    const container = document.getElementById("listaProfissionais");
    container.innerHTML = "";

    lista.forEach((profissional, index) => {
        container.innerHTML += `
      <div class="card">
        <img src="${profissional.fotoPrincipal}" alt="Foto de ${profissional.nickname}">
        <div class="card-info">
          <h2>${profissional.nickname}</h2>
          <p><strong>${profissional.categoria}</strong></p>
          <p>${profissional.cidade}</p>
          <p>${profissional.descricao.substring(0, 70)}...</p>
          <button onclick="abrirModal(${index})">Ver perfil</button>
        </div>
      </div>
    `;
    });
}

function abrirModal(index) {
    const p = profissionais[index];

    document.getElementById("modalNickname").innerText = p.nickname;
    document.getElementById("modalCategoria").innerText = p.categoria;
    document.getElementById("modalCidade").innerText = p.cidade;
    document.getElementById("modalDescricao").innerText = p.descricao;

    const galeria = document.getElementById("modalGaleria");
    galeria.innerHTML = "";

    p.fotos.forEach(foto => {
        galeria.innerHTML += `<img src="${foto}" alt="Trabalho de ${p.nickname}">`;
    });

    const mensagem = `Olá! Vi seu perfil ${p.nickname} no Contrata Perfil e tenho interesse no seu serviço.`;
    document.getElementById("modalWhatsapp").href =
        `https://wa.me/55${p.whatsapp}?text=${encodeURIComponent(mensagem)}`;

    document.getElementById("modalPerfil").style.display = "flex";
}

function fecharModal() {
    document.getElementById("modalPerfil").style.display = "none";
}

function cadastrarProfissional() {
    const nickname = document.getElementById("nickname").value;
    const categoria = document.getElementById("categoria").value;
    const cidade = document.getElementById("cidade").value;
    const whatsapp = document.getElementById("whatsapp").value;
    const descricao = document.getElementById("descricao").value;
    const fotoPrincipalArquivo =
        document.getElementById("fotoPrincipal").files[0];

    const fotosArquivos =
        document.getElementById("fotos").files;

    if (!nickname || !categoria || !cidade || !whatsapp || !descricao || !fotoPrincipalArquivo) {
    alert("Preencha os campos principais.");
    return;
}

const fotoPrincipalURL = URL.createObjectURL(fotoPrincipalArquivo);

const fotosURL = Array.from(fotosArquivos).map(arquivo =>
    URL.createObjectURL(arquivo)
);
    const fotosURL =
        Array.from(fotosArquivos).map(arquivo =>
            URL.createObjectURL(arquivo)
        );
    if (!nickname || !categoria || !cidade || !whatsapp || !descricao || !fotoPrincipalArquivo) {
        alert("Preencha os campos principais.");
        return;
    }

    const novoProfissional = {
        nickname,
        categoria,
        cidade,
        whatsapp,
        descricao,
        fotoPrincipal: fotoPrincipalURL,
        fotos: fotosURL.length > 0
            ? fotosURL
            : [fotoPrincipalURL]
    };

    profissionais.push(novoProfissional);
    if (document.getElementById("listaProfissionais")) {
  mostrarProfissionais();
}

   alert("Perfil publicado com sucesso!");
window.location.href = "index.html";

    document.getElementById("nickname").value = "";
    document.getElementById("categoria").value = "";
    document.getElementById("cidade").value = "";
    document.getElementById("whatsapp").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("fotoPrincipal").value = "";
    document.getElementById("fotos").value = "";
}

const campoBusca = document.getElementById("campoBusca");

if (campoBusca) {
  campoBusca.addEventListener("input", function () {
    const termo = this.value.toLowerCase();

    const filtrados = profissionais.filter(p =>
      p.nickname.toLowerCase().includes(termo) ||
      p.categoria.toLowerCase().includes(termo) ||
      p.cidade.toLowerCase().includes(termo) ||
      p.descricao.toLowerCase().includes(termo)
    );

    mostrarProfissionais(filtrados);
  });
}

if (document.getElementById("listaProfissionais")) {
  mostrarProfissionais();
}