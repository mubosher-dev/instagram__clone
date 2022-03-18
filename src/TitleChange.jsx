import React,{useEffect} from "react";

export const Title = (title) => {
    const pageTitle = title;

    document.title = pageTitle;

    return () => {
        document.title = pageTitle;
    }
}