class MyForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: "",
            Curriculo: null,
            CurriculoFileName: "", 
            Name: "",
            Email: "",
            Tel: "",
            messagem: "",
            TipoServico: "",
        };
        this.changeFunc = this.changeFunc.bind(this);
        this.removeCurriculo = this.removeCurriculo.bind(this);
    }

    componentDidMount() {
        // Carregar dados do Local Storage quando o componente for montado
        const formData = JSON.parse(window.localStorage.getItem("formData")) || {};
        this.setState(formData);
    }

    changeFunc(event) {
        const { id, type, files } = event.target;
        let value;

        if (type === "file") {
            // Se for um campo de arquivo, armazene o nome do arquivo
            value = files[0];
            this.setState({ CurriculoFileName: value.name });
        } else {
            // Caso contrário, armazene o valor normalmente
            value = event.target.value;
        }

        this.setState({
            [id]: value,
        }, () => {
            // Atualizar o Local Storage após o setState ser concluído
            window.localStorage.setItem("formData", JSON.stringify(this.state));
        });
    }

    removeCurriculo() {
        // Limpar o campo de currículo
        this.setState({ Curriculo: null, CurriculoFileName: "" }, () => {
            // Atualizar o Local Storage após o setState ser concluído
            window.localStorage.setItem("formData", JSON.stringify(this.state));
        });

        // Limpar o valor do campo de arquivo
        document.getElementById("Curriculo").value = "";


    }


    handleSubmit = (event) => {
        event.preventDefault();
        
        alert("Formulario submetido com sucesso!");

           // Limpar os campos
           this.setState({
            selectedOption: "",
            Curriculo: null,
            CurriculoFileName: "", 
            Name: "",
            Email: "",
            Tel: "",
            messagem: "",
            TipoServico: "",
        }, () => {

        // Limpar os dados guardados
        window.localStorage.removeItem("formData");

        });
    }

    render() {
        return React.createElement("form", { className: "my-form", onSubmit: this.handleSubmit },
            React.createElement("label", null, "Motivo"),
            React.createElement(
                "select",
                {
                    required: "required",
                    id: "Motivo",
                    onChange: (event) => {
                        this.changeFunc(event);
                        this.setState({ selectedOption: event.target.value });
                    },
                    value: this.state.selectedOption,
                },
                React.createElement("option", { value: "" }, "Selecione o motivo"),
                React.createElement("option", { value: "Informação" }, "Informação"),
                React.createElement("option", { value: "Recomendação" }, "Recomendação"),
                React.createElement("option", { value: "Pedir emprego" }, "Pedir emprego"),
                React.createElement("option", { value: "Pedir serviços" }, "Pedir serviços"),
                React.createElement("option", { value: "Outros" }, "Outros")
            ),

            this.state.selectedOption === "Pedir serviços" && (
                React.createElement("div", null,
                    React.createElement("label", null, "Tipo de Serviço"),
                    React.createElement(
                        "select",
                        {
                            required: "required",
                            id: "TipoServico",
                            onChange: this.changeFunc,
                            value: this.state.TipoServico,
                        },
                        React.createElement("option", { value: "" }, "Selecione o tipo de serviço"),
                        React.createElement("option", { value: "Eventos" }, "Eventos"),
                        React.createElement("option", { value: "Proteção Pessoal" }, "Proteção Pessoal"),
                        React.createElement("option", { value: "Vigilancia" }, "Vigilancia"),
                        React.createElement("option", { value: "Segurança eletronica" }, "Segurança eletronica")
                    )
                )
            ),

            this.state.selectedOption !== "" && (
                React.createElement("div", null,
                    React.createElement("label", null, "Nome"),
                    React.createElement("input", {
                        type: "text",
                        required: "required",
                        id: "Name",
                        onChange: this.changeFunc,
                        value: this.state.Name,
                    }),

                    React.createElement("label", null, "Email"),
                    React.createElement("input", {
                        type: "email",
                        required: "required",
                        id: "Email",
                        onChange: this.changeFunc,
                        value: this.state.Email,
                    }),

                    React.createElement("label", null, "Telefone"),
                    React.createElement("input", {
                        type: "tel",
                        required: "required",
                        id: "Tel",
                        onChange: this.changeFunc,
                        value: this.state.Tel,
                    }),

                    React.createElement("label", null, "Mensagem"),
                    React.createElement("textarea", {
                        required: "required",
                        id: "messagem",
                        rows: "6",
                        onChange: this.changeFunc,
                        value: this.state.messagem,
                    }),

                    this.state.selectedOption === "Pedir emprego" && (
                        React.createElement("div", { className: "file-upload-container" },
                            React.createElement("label", null, "Currículo"),
                            React.createElement("input", {
                                type: "file",
                                id: "Curriculo",
                                onChange: this.changeFunc,
                            }),
                            this.state.CurriculoFileName && (
                                React.createElement("div", { className: "remove-curr-icon", onClick: this.removeCurriculo },
                                    React.createElement("img", { src: "../images/apagar.png", alt: "Remover Currículo" })
                                )
                            )
                        )
                    ),

                    React.createElement("input", {
                        className: "btn",
                        type: "submit",
                        value: "Enviar",
                    })
                )
            )
        );
    }
}

// Render the form component
ReactDOM.render(React.createElement(MyForm), document.getElementById('react-container'));