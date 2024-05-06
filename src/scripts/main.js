$(document).ready(function () {
    $('#nome').on('input', function (e) {
        if ($(this).val().length < 2) {
            $(this).css('border', '3px solid yellow')
        }
        else {
            $(this).css('border', '3px solid green')
        }
    })
    $('#sobrenome').on('input', function (e) {
        if ($(this).val().length < 2) {
            $(this).css('border', '3px solid yellow')
        }
        else {
            $(this).css('border', '3px solid green')
        }
    })
    $('#pass1').on('input', function (e) {
        if ($(this).val().length < 3) {
            $(this).css('border', '3px solid yellow')
        }
        else {
            $(this).css('border', '3px solid green')
        }
    })


    $('#pass2').on('input', function (e) {
        if ($(this).val().length !== $('#pass1').val().length) {
            $(this).css('border', '3px solid yellow')
            $('#pass1').css('border', '3px solid yellow')
        }
        else {
            $(this).css('border', '3px solid green')
            $('#pass1').css('border', '3px solid green')
        }
    })

    $('#email').on('input', function (e) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test($('#email').val())) {
            $('#email').css('border', '3px solid yellow')
        }
        else {
            $('#email').css('border', '3px solid green')
        }
    })

    $('#numero').on('input', function (e) {
        if ($(this).val().length < 3) {
            $(this).css('border', '3px solid yellow')
        }
        else {
            $(this).css('border', '3px solid green')
        }
    })


    $('#btn-buscar').click(function () {
        const cep = $('#cep').val();
        const endpoint = `https://viacep.com.br/ws/${cep}/json`;
        const botao = $(this);
        botao.find('i').addClass('d-none');
        botao.find('span').removeClass('d-none');

        fetch(endpoint).then(function (resposta) {
            return resposta.json();
        })

            .then(function (json) {
                if (json.erro === true) {
                    setTimeout(function () {
                        const mensagemErro = `CEP INVÁLIDO!`;
                        const inputEndereco = $('#endereco');
                        inputEndereco.val(mensagemErro);
                        inputEndereco.css('border', '3px solid red');
                        inputEndereco.css('color', 'red');
                        inputEndereco.click(function () {
                            inputEndereco.val('')
                            inputEndereco.css({
                                'color': '',
                                'border': ''
                            })
                        })
                    }, 1000)

                }

                else {
                    setTimeout(function () {
                        const inputEndereco = $('#endereco')
                        const logradouro = json.logradouro;
                        const bairro = json.bairro;
                        const cidade = json.localidade;
                        const estado = json.uf;
                        const endereco = `${logradouro}, ${bairro} - ${cidade} -  ${estado}`;
                        inputEndereco.val(endereco);
                        inputEndereco.css('border', '3px solid green');
                        inputEndereco.css('color', 'black');
                        inputEndereco.click(function () {
                            inputEndereco.val('')
                            inputEndereco.css({
                                'border': '',
                                'color': ''
                            })
                        })
                    }, 1000)
                }
            })
            .catch(function (erro) {
                alert('Algum erro ocorreu. Tente novamente mais tarde.')
            })
            .finally(function () {
                setTimeout(function () {
                    botao.find('span').addClass('d-none');
                    botao.find('i').removeClass('d-none');
                }, 1000)
            })
    })


    $('#form-submit').submit(function (e) {
        e.preventDefault;
        const botao = $('#btn-enviar-dados')
        botao.find('span').removeClass('d-none');
        const nome = $('#nome').val();
        const sobrenome = $('#sobrenome').val();
        const senha = $('#pass1').val();
        const email = $('#email').val();
        const cep = $('#cep').val();
        const endereco = $('#endereco').val();
        const numero = $('#numero').val();
        if (nome.length == 0 || sobrenome.length == 0 || senha.length == 0 || email.length == 0 || cep.length == 0 || endereco.length == 0 || numero.length == 0) {
            alert('Você esqueceu algum campo vazio')
            throw new Error('Você esqueceu algum campo em branco')
        }

        else {
            alert('Cadastro realizado com sucesso!')
        }

    })
})