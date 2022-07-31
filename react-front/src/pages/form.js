import React, {Component} from 'react';
import InputForm from "../components/form";
import '../styles/newForm.scss'
import axios from "axios";

class Form extends Component {
    state={
        name:{name:'name', value:'',err:false},
        number:{name:'number', value:'',err:false},
        adress:{name:'adress', value:'',err:false},
        email:{name:'email', value:'',err:false},
        visilbe:false,
        response:{name:'',email:'',adress:'',number:''}
    }
    checkValues = async () => {
        console.log(this.state.name.err)
        if (this.state.number.value.length < 18) {
            await this.setState({number: {name: 'number', value: this.state.number.value, err: true}})
            console.log(this.state.number.err)
        }else{
            await this.setState({number: {name: 'number', value: this.state.number.value, err: false}})
        }
        if (this.state.name.value.length < 2) {
            await this.setState({name: {name: 'name', value: this.state.name.value, err: true}})
            console.log(this.state.name.err)
        }else{
            await this.setState({name: {name: 'name', value: this.state.name.value, err: false}})
        }
        if (this.state.email.value.length < 5) {
            await this.setState({email: {name: 'email', value: this.state.email.value, err: true}})
            console.log(this.state.email.err)
        }else{
            await this.setState({email: {name: 'email', value: this.state.email.value, err: false}})
        }
        if (this.state.adress.value.length < 4) {
            await this.setState({adress: {name: 'adress', value: this.state.adress.value, err: true}})
            console.log(this.state.adress.err)
        }else{
            await this.setState({adress: {name: 'adress', value: this.state.adress.value, err: false}})
        }

        // eslint-disable-next-line no-mixed-operators
        if((this.state.name.err  === true ) || (this.state.email.err   === true ) ||(this.state.adress.err   === true ) ||(this.state.number.err  === true ) ) {
            return false
        }
        else{
            console.log('err')
            console.log(this.state.name.err)
            console.log(this.state.email.err)
            console.log(this.state.adress.err)
            console.log(this.state.number.err)
            console.log('0 err')
            return true
        }
    }

    sendPostReq = async () => {
        if (await this.checkValues() === true){
        // let res = await this.checkValues()
        let numberPhone = this.state.number.value.replace(/[^\d]/g, '')

        let formData = new FormData()
        let data = {
            name:this.state.name.value,
            number:numberPhone,
            email:this.state.email.value,
            adress:this.state.adress.value,
        }
        formData.append("addForm",JSON.stringify(data))
            await this.setState({visible: true})
        await axios.post('http://62.217.176.86:80/api.php/', formData)
            .then(async res => {
                console.log(res)
                if (res.data === true) {
                    console.log(numberPhone)

                    await this.setState({
                        response: {
                            name: this.state.name.value,
                            email: this.state.email.value,
                            adress: this.state.adress.value,
                            number: numberPhone
                        }
                    })
                    await this.setState({visible: true})
                    // console.log('visible is ' + this.state.visilbe)
                }

            })
            .catch(async (err) => {
                await this.setState({visible: true})
                await this.setState({
                    response: {
                        name: 'ERROR SEND POST',
                        email: 'ERROR SEND POST',
                        adress: 'ERROR SEND POST',
                        number: 'ERROR SEND POST'
                    }
                })
            })

        }
        // console.log('nc' +res)
    }
    updateData = async (value) => {
        // console.log(value)
        switch (value.name) {
            default:
                console.log('addExist input')
                break;
            case 'name':
                await this.setState({name: value})
                break;
            case 'number':
                await this.setState({number: value})
                break;
            case 'adress':
                await this.setState({adress: value})
                break;
            case 'email':
                await this.setState({email: value})
                break;
        }
        // console.log(this.state.name)

    }
    render() {
        return (
            <div className={'form'}>

                <InputForm
                    checkErr={this.state.name.err}
                    type="text"
                    placeHolder="Ваше имя"
                    name={this.state.name.name}
                    value={this.state.name}
                    updateData={this.updateData}
    />


                <InputForm
                    checkErr={this.state.number.err}
                    pattern="\+7\s?[\(]{0,1}9[0-9]{2}[\)]{0,1}\s?\d{3}[-]{0,1}\d{2}[-]{0,1}\d{2}"
                    type="tel"
                    placeHolder="Контактный номер"
                    name={this.state.number.name}
                    value={this.state.number}
                    updateData={this.updateData}
                />
                <InputForm
                    checkErr={this.state.adress.err}
                    type="text"
                    placeHolder="Адрес"
                    name={this.state.adress.name}
                    value={this.state.adress}
                    updateData={this.updateData}
                />
                <InputForm
                    checkErr={this.state.email.err}
                    type="email"
                    placeHolder="Email"
                    name={this.state.email.name}
                    value={this.state.email}
                    updateData={this.updateData}
                />

                <button onMouseDown={this.sendPostReq} >Отправить</button>

                <div  style={(this.state.visible) ? {display:"block" , width:"100%"} : {display:"none" , width:"100%"}}>
                    <table>
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <th>Number</th>
                                <th>Email</th>
                                <th>Adress</th>
                            </tr>
                            <tr>
                                <td>{this.state.response.name}</td>
                                <td>{this.state.response.number}</td>
                                <td>{this.state.response.email}</td>
                                <td>{this.state.response.adress}</td>

                            </tr>
                        </tbody>

                    </table>
                </div>

            </div>
        );
    }
}

export default Form;