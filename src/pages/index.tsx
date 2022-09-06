import { Products } from '@prisma/client'
import axios from 'axios'
import { NextPage } from 'next'
import DelayInput from 'components/DelayInput/DelayInput'

type Props = {
  products: Products[]
}

export async function getServerSideProps(context: any) {
  const host = context.req.headers.host || 'localhost:3000'
  const protocol = /^localhost/.test(host) ? 'http' : 'https'
  const products = await axios.get<Products[]>(`${protocol}://${host}/api/data`).then((res) => res.data)
  return {
    props: {
      products,
    },
  }
}

const Page: NextPage<Props, Error> = ({ products }) => {
  return (
    <>
      <h1>メニュー</h1>
      {products.map((product) => (
        <div key={product.id}>
          No.{product.id}:『{product.name}』 {product.price}円
        </div>
      ))}
    </>
  )
}

export default Page
