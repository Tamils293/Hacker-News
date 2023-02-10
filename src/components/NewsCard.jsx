import React from 'react'
import Highlighter from "react-highlight-words";

function NewsCard({ article, index, page = "home", query = "" }) {

    return (
        <div className={`news-card  ${page == "Search" && "pl-3 m-3"}  d-inline-flex p-0.5 m-0.5`}>
            {page != "Search" && <d>
                <span style={{ color: "#828282" }}>{index + 1}.</span>
                <div style={{ display: 'inline-flex', justifyContent: "end", alignItems: "end" }}>
                    <span className='cursor-pointer mx-1 upVote'>
                        <img src="/assets/upArrow.svg"></img>
                    </span>
                </div>
            </d>}

            <span className='ml-0.5 cursor-pointer' style={{ fontSize: "10pt" }}>


                {query.length != 0 ? <>
                    <Highlighter
                        highlightClassName="highlightCls"
                        searchWords={[query]}
                        // autoEscape={true}
                        textToHighlight={article.title || article.comment_text}
                    />
                </> : article.title || article.comment_text}</span><a className="URL" href={article.truURl}>({article.url})</a>

            <div style={
                String(index + 1).length == 2 ? { fontSize: "7pt", color: "#828282" } : { fontSize: "7pt", color: "#828282" }
            } className=''>
                <span className=''>{article.timDiff}</span>
                <span href={article.url}>{article.points}</span> {" "} <span className="author">
                    by {article.author}<span className='cursor-pointer underline mx-0.5 '>hide|pass|discuss </span>
                </span>
            </div>
        </div>
    )
}

export default NewsCard