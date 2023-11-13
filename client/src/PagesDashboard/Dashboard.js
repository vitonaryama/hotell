import React from 'react'
import Sidebar from '../Components/Sidebar'
import Header from '../Components/Header';
import axios from 'axios'

export default class Dashboard extends React.Component {
    constructor() {
        super()
        this.state = {
            user: [],
            customer: [],
            typeroom: [],
            room: [],
            role: "",
            token: "",
            action: ""

        }

        if (localStorage.getItem("token")) {
            if (localStorage.getItem("role") === "admin" ||
                localStorage.getItem("role") === "resepsionis") {
                this.state.token = localStorage.getItem("token")
                this.state.role = localStorage.getItem("role")
            } else {
                window.alert("You're not admin or resepsionis!")
                window.location = "/"
            }
        }
    }

    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header;
    }

    getUser = () => {
        let url = "http://localhost:8080/user";
        axios
            .get(url, this.headerConfig())
            .then((response) => {
                this.setState({
                    user: response.data.count,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    getCustomer = () => {
        let url = "http://localhost:8080/customer/"
        axios.get(url)
            .then((response) => {
                this.setState({
                    customer: response.data.count
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    getRoom = () => {
        let url = "http://localhost:8080/room"
        axios.get(url)
            .then(response => {
                this.setState({
                    room: response.data.count
                })
                console.log(response.data.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    getTypeRoom = () => {
        let url = "http://localhost:8080/room-type"
        axios.get(url)
            .then(response => {
                this.setState({
                    typeroom: response.data.count
                })
                console.log(response.data.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    checkRole = () => {
        if (this.state.role !== "admin" && this.state.role !== "resepsionis") {
            localStorage.clear()
            window.alert("You're not admin or resepsionis!")
            window.location = '/'
        }
    }

    componentDidMount() {
        this.getUser();
        this.getCustomer();
        this.getRoom()
        this.getTypeRoom()
        this.checkRole()
    }

    render() {
        return (
            <div class="flex flex-row min-h-screen bg-gray-100 text-gray-800">
                <Sidebar />
                <main class="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
                    <Header />
                    <div class="main-content flex flex-col flex-grow p-4">
                        <div class="flex flex-row h-40">
                            <div class="w-1/2 text-gray-700 text-center bg-rose-300 px-4 py-2 m-2 rounded-md border-2  border-rose-400 ">
                                <p class="mt-8 text-xl font-medium">Jumlah User</p>
                                <p class="text-lg font-bold">{this.state.user}</p>
                            </div>
                            <div class="w-1/2 text-gray-700 text-center bg-fuchsia-300 px-4 py-2 m-2 rounded-md border-2  border-fuchsia-400 ">
                                <p class="mt-8 text-xl font-medium">Jumlah Customer</p>
                                <p class="text-lg font-bold">{this.state.customer}</p>
                            </div>
                        </div>
                        <div class="flex flex-row h-40">
                            <div class="w-1/2 text-gray-700 text-center bg-sky-300 px-4 py-2 m-2 rounded-md border-2  border-sky-400 ">
                                <p class="mt-8 text-xl font-medium">Jumlah Room</p>
                                <p class="text-lg font-bold">{this.state.room}</p>
                            </div>
                            <div class="w-1/2 text-gray-700 text-center bg-cyan-300 px-4 py-2 m-2 rounded-md border-2  border-cyan-400 ">
                                <p class="mt-8 text-xl font-medium">Jumlah Type Room</p>
                                <p class="text-lg font-bold">{this.state.typeroom}</p>
                            </div>
                        </div>
                    </div>
                    <footer class="footer px-4 py-2">
                        <div class="footer-content">
                            <p class="text-sm text-gray-600 text-center">© Brandname 2023. All rights reserved. <a href="https://twitter.com/iaminos">by Erairris</a></p>
                        </div>
                    </footer>
                </main>
            </div>
        );
    }
}