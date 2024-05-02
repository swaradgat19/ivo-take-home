import { ReactHTML } from "react"

export const Element = ({tag} : {tag: keyof ReactHTML}) => {
    const Tag = tag
    return (
        <div>
            <Tag>hello</Tag>
        </div>
    )
 }
 