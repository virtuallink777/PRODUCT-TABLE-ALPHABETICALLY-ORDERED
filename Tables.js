import {PRODUCTS} from "./ApiJson"
import "../Tablets.css"
import { useState } from "react"

export default function Tables(){
    return(
        <FilterableProductTable/>
    )
}

function FilterableProductTable( {products} ){
    const [filterText, setFilterText] = useState("")
    const [inCheckOnly, setInCheckOnly] = useState(false)
    return(
        <>
        <SearchBar
        filterText={filterText}
        inCheckOnly={inCheckOnly}
        funcsetFilterText={(text)=>setFilterText(text)}
        funcsetInCheckOnly={(value)=>setInCheckOnly(value)}
        />
        <ProductTable
        products={PRODUCTS}
        filterText={filterText}
        inCheckOnly={inCheckOnly}
        />
        </>
    )

}

function SearchBar( {filterText, inCheckOnly, funcsetFilterText, funcsetInCheckOnly} ){
    return(
        <form>
            <input 
            type="text" 
            placeholder="Buscar..."
            value={filterText}
            onChange={(e)=>funcsetFilterText(e.target.value)}
            />
            <label>
                <input 
                type="CheckBox"
                checked={inCheckOnly}
                onChange={(e)=>funcsetInCheckOnly(e.target.checked)}
                />
                Mostrar solo productos en stock
            </label>
        </form>
    )

}

function ProductTable( {products, filterText,inCheckOnly} ){
    const NewCategory = {};
    const rows = [];

    products.forEach(product => {
        if(!NewCategory[product.category]){
            NewCategory[product.category]=[]
        }
        NewCategory[product.category].push(product)
    });

    const sortNewcategory = Object.keys(NewCategory).sort()

    sortNewcategory.forEach((category)=>{
        rows.push(
            <ProductCategoryRow
            category={category}
            key={category}
            />
        )

        NewCategory[category]
        .filter((product)=> !inCheckOnly || product.stocked)
        .filter((product)=> filterText === "" || product.name.toLowerCase().includes(filterText.toLowerCase()))
        .sort((a,b)=> a.name.localeCompare(b.name))
        .forEach((product)=>{
            rows.push(
                <ProductRow
                product={product}
                key={product.name}
                />
            )
        })
    })
    return(
        <table>
            <thead>
                <tr>
                    <th>NOMBRE</th>
                    <th>PRECIO</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )


}

function ProductCategoryRow( {category} ){
    return(
        <tr>
            <th colSpan={2}>
                {category}
            </th>
        </tr>
    )

}

function ProductRow( {product} ){
    const name = product.stocked?product.name:
        <span style={{color:"orange"}}>
            {product.name}
        </span>;
        return(
            <tr>
                <td>{name}</td>
                <td>{product.price}</td>
            </tr>
        )

}
