import React, { useState, useEffect } from 'react'
import axios from "axios";
import NewsCard from './NewsCard';
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate"
function NewsPage() {
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoding] = useState(false)
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const navigate = useNavigate();

    const getURL = (inputString) => {
        // inputString = "https://www.youtube.com/watch?v=Gt2zubHcER4";
        const url = new URL(inputString);
        var domainName = url.hostname.replace("www.", "");
        return domainName



    }

    const handleGoHome = () => {
        navigate("/search"); // New line
    };
    useEffect(() => {
        setIsLoding(true);

        const fetchData = async () => {
            try {
                const { data } = await axios.get("https://hn.algolia.com/api/v1/search_by_date?tags=story", {
                    params: { page: currentPage }
                });
                const { hits, nbPages, created_at } = data;

                // words.filter();
                var HitsFr = hits.filter(word => word.url != null && word.title != null)


                // let data = [
                //     { id: 1, name: "John", age: 25 },
                //     { id: 2, name: "Jane", age: 30 },
                //     { id: 3, name: "Jim", age: 35 }
                //   ];


                HitsFr = HitsFr.map(item => {
                    if (item.created_at) {
                        const timestamp = item.created_at;
                        if (item.url != null) {
                            item["truURl"] = item.url
                            item.url = getURL(item.url)
                        }
                        const now = new Date();
                        const past = new Date(timestamp);
                        const diffInMs = now - past;
                        const diffInMinutes = diffInMs / 1000 / 60;
                        const diffInHours = diffInMinutes / 60;
                        const hours = Math.floor(diffInHours);
                        const minutes = Math.floor(diffInMinutes - hours * 60);
                        if (hours == 0) {
                            return { ...item, timDiff: `${minutes}minutes ago `, }
                                ;
                        }
                        else return { ...item, timDiff: `${hours}${hours == 1 ? "hour" : "hours"} ago` };
                    }

                }



                )


                    ;


                setArticles(HitsFr);

                setTotalPages(nbPages);

            } catch (error) {
                console.log(error)
            }
            finally {
                setIsLoding(false)
            }
        };
        fetchData();
    }, [currentPage])


    const handlePageChange = (event) => {
        setCurrentPage(event.selected)
    }
    return (
        <div className='conatiner'>
            <nav style={{ backgroundColor: "#ff6600" }} class=" border-gray-200   ">
                <div class=" flex items-center  mx-auto">
                    <a href="https://flowbite.com/" class="flex  border-gray-200 items-center">
                        <img src="/assets/y18.gif" class="m-0.5 border-solid border-2 border-white-600  " alt="Flowbite Logo" />
                        <b class="p-0.5 self-center text-sm  whitespace-nowrap dark:text-black">Hacker News</b>
                    </a>
                    <div style={{ fontSize: "10pt", cursor: "pointer" }} id="divNav" className='ml-3'>
                        <a href="" className="nav-title">new</a>|
                        <a href="" className="nav-title">past</a>|
                        <a href="" className="nav-title">comments</a>|
                        <a href="" className="nav-title">ask</a>|
                        <a href="" className="nav-title">login</a>|
                        <a href="" className="nav-title">jobs</a>|
                        <a onClick={handleGoHome} className="nav-title">search</a>

                        <a href="" style={{ marginLeft: "38rem", fontWeight: "500" }} ></a>


                    </div>
                    <div id="navID" style={{ display: "none" }}>
                        <a onClick={handleGoHome} className=" nav-title">search</a>

                    </div>
                </div>
            </nav>
            <div className='news-container mt-2'>
                {
                    isLoading ?
                        <p>Loading...</p> :
                        articles.map((article, i) => (


                            <NewsCard index={i} article={article} key={article.objectID} />

                        ))
                }
            </div>
            <ReactPaginate
                nextLabel=">>"
                previousLabel="<<"
                breakLabel="..."
                forcePage={currentPage}
                pageCount={totalPages}
                renderOnZeroPageCount={null}
                onPageChange={handlePageChange}
                className="pagination"
                activeClassName='active-page'
                previousClassName='previous-page'
                nextClassName='next-page'

            />


        </div>
    )
}

export default NewsPage