
import { useAuth } from "context/auth-context";
import qs from "qs"
import * as auth from "../auth-provider"
const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
    token?: string;
    data?: Object;
}

export const http = async (endoint: string, { data, token, headers, ...customConfig }: Config) => {
    const config = {
        method: "GET",
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
            "Content-Type": data ? "application/json" : ""
        },
        ...customConfig
    }

    if (config.method.toUpperCase() === 'GET') {
        endoint += `?${qs.stringify(data)}`
    } else {
        config.body = JSON.stringify(data || {})
    }

    return window.fetch(`${apiUrl}/${endoint}`, config)
        .then(async response => {
            if (response.status === 401) {
                await auth.logout()
                window.location.reload()
                return Promise.reject({ message: '请重新登录' })
            }

            const data = await response.json()

            if (response.ok) {
                return data
            } else {
                return Promise.reject(data)
            }
        })
}

export const useHttp = () => {
    const { user } = useAuth();
    // ts 操作符 utility types
    return ([endpoint, config]: Parameters<typeof http>) => http(endpoint, { ...config, token: user?.token })
}

// 联合类型
// let myFavoriteNumber: string | number
// myFavoriteNumber = 'seven'
// myFavoriteNumber = 7


// let jackFavoriteNumber: string | number

// // 类型别名

// type FavoriteNumber = string | number

// let roseFavoriteNumber: FavoriteNumber = '6'

// // 接口类型
// interface Person {
//     name: string
// }
// 类型别名很多情况下可以和 interface 互换
// interface 在联合类型情况下 不能替代 类型别名
// interface 也不能使用utility types

// const xiaoMing: Person = { name: 'xiaoming' }

type Person = {
    name: string,
    age: number
}

// Partial 用于person不固定数据
const xiaoMing: Partial<Person> = { name: 'xiaoMing' };

// Omit 第一个是基础类型 第二个是要删除的属性名
const shenMiRen: Omit<Person, 'name' | 'age'> = {age:8}

// keyof
// Pick
// Exclude