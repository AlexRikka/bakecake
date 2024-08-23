Vue.createApp({
    name: "App",
    components: {
        VForm: VeeValidate.Form,
        VField: VeeValidate.Field,
        ErrorMessage: VeeValidate.ErrorMessage,
    },
    data() {
        return {
            schema1: {
                lvls: (value) => {
                    if (value) {
                        return true;
                    }
                    return ' количество уровней';
                },
                form: (value) => {
                    if (value) {
                        return true;
                    }
                    return ' форму торта';
                },
                topping: (value) => {
                    if (value) {
                        return true;
                    }
                    return ' топпинг';
                }
            },
            schema2: {
                name: (value) => {
                    if (value) {
                        return true;
                    }
                    return ' имя';
                },
                phone: (value) => {
                    if (value) {
                        return true;
                    }
                    return ' телефон';
                },
                name_format: (value) => {
                    const regex = /^[a-zA-Zа-яА-Я]+$/
                    if (!value) {
                        return true;
                    }
                    if (!regex.test(value)) {

                        return '⚠ Формат имени нарушен';
                    }
                    return true;
                },
                email_format: (value) => {
                    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
                    if (!value) {
                        return true;
                    }
                    if (!regex.test(value)) {

                        return '⚠ Формат почты нарушен';
                    }
                    return true;
                },
                phone_format: (value) => {
                    const regex = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/
                    if (!value) {
                        return true;
                    }
                    if (!regex.test(value)) {

                        return '⚠ Формат телефона нарушен';
                    }
                    return true;
                },
                email: (value) => {
                    if (value) {
                        return true;
                    }
                    return ' почту';
                },
                address: (value) => {
                    if (value) {
                        return true;
                    }
                    return ' адрес';
                },
                date: (value) => {
                    if (value) {
                        return true;
                    }
                    return ' дату доставки';
                },
                time: (value) => {
                    if (value) {
                        return true;
                    }
                    return ' время доставки';
                }
            },
            DATA: window.appData,
            // DATA: {
            //     Levels: ['не выбрано', '1', '2', '3'],
            //     Forms: ['не выбрано', 'Круг', 'Квадрат', 'Прямоугольник'],
            //     Toppings: ['не выбрано', 'Без', 'Белый соус', 'Карамельный', 'Кленовый', 'Черничный', 'Молочный шоколад', 'Клубничный'],
            //     Berries: ['нет', 'Ежевика', 'Малина', 'Голубика', 'Клубника'],
            //     Decors: ['нет', 'Фисташки', 'Безе', 'Фундук', 'Пекан', 'Маршмеллоу', 'Марципан']
            // },
            // Costs: {
            //     Levels: [0, 400, 750, 1100],
            //     Forms: [0, 600, 400, 1000],
            //     Toppings: [0, 0, 200, 180, 200, 300, 350, 200],
            //     Berries: [0, 400, 300, 450, 500],
            //     Decors: [0, 300, 400, 350, 300, 200, 280],
            //     Words: 500
            // },
            Costs: window.costs,
            Levels: window.cakespecs.Levels,
            Form: window.cakespecs.Form,
            Topping: 0,
            Berries: 0,
            Decor: 0,
            Words: '',
            Comments: '',
            Designed: false,

            Name: '',
            Phone: null,
            Email: null,
            Address: null,
            Dates: null,
            Time: null,
            DelivComments: ''
        }
    },
    methods: {
        ToStep4() {
            this.Designed = true
            setTimeout(() => this.$refs.ToStep4.click(), 0);
        },
        async submitForm() {
            try {

                const body = JSON.stringify({
                    customcake: {
                        level: this.Levels,
                        shape: this.Form,
                        topping: this.Topping,
                        berry: this.Berries,
                        decoration: this.Decor,
                        title: this.Words,
                    },
                    comment: this.Comments,
                    name: this.Name,
                    phone: this.Phone,
                    email: this.Email,
                    address: this.Address,
                    desired_date: this.Dates,
                    desired_time: this.Time,
                    comment: this.DelivComments
                })
                console.log(body)
                const token = document.querySelector("input[name='csrfmiddlewaretoken']").value
                const response = await fetch('/api/order/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': token
                    },
                    body: body
                });

                const result = await response.json();

                if (response.ok) {
                    console.log('Form submitted successfully:', result);
                } else {
                    console.error('Error submitting form:', result);
                }
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        },
    },
    computed: {
        Cost() {
            let W = this.Words ? this.Costs.Words : 0
            return this.Costs.Levels[this.Levels] + this.Costs.Forms[this.Form] +
                this.Costs.Toppings[this.Topping] + this.Costs.Berries[this.Berries] +
                this.Costs.Decors[this.Decor] + W
        }
    },
    mounted() {
    }
}).mount('#VueApp')