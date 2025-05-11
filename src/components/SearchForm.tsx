"use client"
import React from 'react';
import Form from "next/form";
import SearchFormReset from "@/components/SearchFormReset";
import {Search} from "lucide-react"

const SearchForm = ({query}:{query?:string}) => {
    //const query="test";
    return (
        <Form action="/" scroll={false} className="search-form">
            <input
            name="query"
            defaultValue={query}
            placeholder="Search Ideas"
            className="search-input"
            />
            <div className="flex gap-2">
                {query && <SearchFormReset />}
                <button type="submit" className="search-btn text-white">
                    <Search className="size-5"/>
                </button>
            </div>
        </Form>
    );
};

export default SearchForm;