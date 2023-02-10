import React, { useEffect, useState } from 'react'
import axios from "axios";
import NewsCard from './NewsCard';
import ReactPaginate from "react-paginate"
function SearchPage() {
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoding] = useState(false)
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [query, setQuery] = useState("");
    const [SearchInput, setSearchInput] = useState("");
    const [popFilter, setPopFilter] = useState("popularity");
    const [lastFilter, setLastFilter] = useState("");
    const [filter, setFilter] = useState("story");
    const handlePageChange = (event) => {
        setCurrentPage(event.selected)
    }


    // import React from 'react';


    // export default HighlightedText;
    useEffect(() => {

        var element = document.getElementById("root");
        var body = document.getElementById("body");
        element.classList.remove("rootWhite");
        element.classList.add("rootBlack");
        body.classList.add("m-0");


    }, [])


    const fetchData = async (flag, popFlag) => {
        try {
            // http://hn.algolia.com/api/v1/search_by_date?tags=Story?dateRange=all&page=0&prefix=true&query=&sort=byPopularity&type=all
            let text

            debugger


            if (popFlag == "date") {
                if (lastFilter.length != 0) {
                    text = `http://hn.algolia.com/api/v1/search_by_date?tags=${flag}&numericFilters=${lastFilter}`
                }
                else text = `http://hn.algolia.com/api/v1/search_by_date?tags=${flag}`
            }

            else if (popFlag != "date") {
                if (lastFilter.length != 0) {
                    text = `http://hn.algolia.com/api/v1/search?tags=${flag}&numericFilters=${lastFilter}`
                }
                else text = `http://hn.algolia.com/api/v1/search?tags=${flag}`
            }



            let { data } = await axios.get(text, {
                params: { page: currentPage, query: query }
            });



            const { hits, nbPages, created_at } = data;

            // words.filter();
            var HitsFr




            if (filter == "comment") {

                HitsFr = hits.filter(word => word.comment_text != null && word.comment_text)
                // seacrhIt.map((d, i) => d)
            }


            // if(flag="")

            else {

                HitsFr = hits.filter(word => word.title != null)
                    .map(item => {
                        if (item.created_at) {
                            const timeStamp = item.created_at;
                            const currentTime = new Date();
                            const pastTime = new Date(timeStamp);
                            const differenceInMilliseconds = currentTime - pastTime;
                            const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
                            const differenceInWeeks = differenceInDays / 7;
                            const differenceInMonths = differenceInWeeks / 4;
                            const differenceInYears = differenceInMonths / 12;
                            const differenceInMinutes = differenceInMilliseconds / 1000 / 60;
                            const differenceInHours = differenceInMinutes / 60;

                            if (differenceInYears >= 1) {
                                return { ...item, timDiff: `${Math.floor(differenceInYears)} years ago ` }

                                // console.log(Math.floor(differenceInYears), "years ago");
                            } else if (differenceInMonths >= 1) {
                                return { ...item, timDiff: `${Math.floor(differenceInMonths)} months ago ` }
                                // console.log(Math.floor(differenceInMonths), "months ago");
                            } else if (differenceInWeeks >= 1) {
                                return { ...item, timDiff: `${Math.floor(differenceInWeeks)} weeks ago ` }

                                // console.log(Math.floor(differenceInWeeks), "weeks ago");
                            }
                            else if (differenceInDays >= 1) {
                                return { ...item, timDiff: `${Math.floor(differenceInDays)} days ago ` }

                            }
                            else if (differenceInHours >= 1) {
                                return { ...item, timDiff: `${Math.floor(differenceInHours)} days ago ` }

                            }
                            else {

                                return { ...item, timDiff: `${Math.floor(differenceInMinutes)} mintes ago ` }
                            }

                        }

                    });

            }



            setArticles(HitsFr);
            // console.log(HitsFr[0])
            setTotalPages(nbPages);

        } catch (error) {
            console.log(error)
        }
        finally {

        }
    };
    // useEffect(() => {




    // }, [])


    useEffect(() => {

        // query.length == 0 && setIsLoding(true);

        debugger
        fetchData(filter, popFilter);
    }, [filter, currentPage, query, popFilter, lastFilter])


    const handleBlur = (e) => {


        // setCurrentPage(0);
        setQuery(SearchInput)

    }
    const handleFilter = (e) => {
        setFilter(e.target.value)
        // setQuery(SearchInput)

    }
    const handlePopFilter = (e) => {
        setPopFilter(e.target.value)
        // setQuery(SearchInput)

    }


    return (
        <div className='conatiner'>
            <header className='SearchHeader w-100'>
                <div className="SearchHead_search">
                    <span className="SearchHeader_logo">
                        <a href="">
                            <img src="/assets/h.png"></img>
                        </a>
                        <a>
                            <div class="SearchHeader_label">Search<br />Hacker News</div>
                        </a>

                    </span>

                    <div class="SearchHeader_container"><span class="SearchIcon">
                        <img src="/assets/search.svg"></img>
                    </span>


                        <input onKeyUp={handleBlur} type="search" value={SearchInput}
                            onChange={event => setSearchInput(event.target.value)}
                            placeholder="Search stories by title, url or author" class="SearchInput" />

                    </div>
                    <div class=" SearchHeader_settings"
                    ><a className='flex' href="/settings">
                            <img src="/assets/gear.svg"></img>
                            <span className='ml-1'>Settings</span>

                        </a>
                    </div>
                </div>
            </header>
            <div className='search-container mt-2'>
                <div className='flex m-2'>
                    <label htmlFor="" style={{ fontWeight: "500" }} className="lbl mx-2 ">Search</label>
                    <select onChange={handleFilter} name="relevancy" id="relevancy">
                        <option value="story">All</option>
                        <option value="story">Stories</option>
                        <option value="comment">Comments</option>

                    </select>
                    <label htmlFor="" style={{ fontWeight: "500" }} className="lbl mx-2">For</label>
                    <select onChange={handlePopFilter} style={{ borderRadius: "5px" }} name="for" id="for">
                        <option value="">Popularity</option>
                        <option value="date">Date</option>


                    </select>
                    <label htmlFor="" style={{ fontWeight: "500" }} className="lbl mx-2">by</label>
                    <select name="by" onChange={(e) => { setLastFilter(e.target.value) }} id="by">
                        <option value="all">All time</option>
                        <option value={`created_at_i>${Date.now() / 1000 - 86400}`}>Last 24</option>
                        <option value={`created_at_i>${Date.now() / 1000 - 604800}`}>Past week</option>
                        <option value={`created_at_i>${Date.now() / 1000 - 2592000}`}>Past month</option>
                        <option value={`created_at_i>${Date.now() / 1000 - 31536000}`}>Past year</option>
                        <option value="custom">Custom year</option>


                    </select>

                    {lastFilter == "custom" && <input type="date" />}
                </div>
                <div className='news-container1 mt-2'>
                    {
                        isLoading ?
                            <p>Loading...</p> :
                            articles.map((article, i) => (


                                <NewsCard page="Search" query={query} index={i} article={article} key={article.objectID} />

                            ))
                    }
                </div>


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
        </div >
    )
}

export default SearchPage