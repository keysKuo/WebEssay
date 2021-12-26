import QuoteList from "../components/quotes/QuoteList";
import useHttp from '../hooks/use-http';
import { getAllQuotes } from "../lib/api";
import { useEffect } from "react";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NoQuotesFound from '../components/quotes/NoQuotesFound';

// const DUMMY_QUOTES = [
//     { id: "q1", author: "Sheldon", text: "Success is a journey, not a destination"},
//     { id: "q2", author: "Kuo", text: "If this life only hands you lemons, throw them back and ask for a piece of pizza"}
// ]

const AllQuotes = () => {
    const {sendRequest, status, data: loadedQuotes, error} = useHttp(
        getAllQuotes,
        true
    );

    useEffect(() => {
        sendRequest();
    }, [sendRequest]);

    if(status === 'pending') {
        return (
            <div className="centered">
                <LoadingSpinner />
            </div>
        )
    }

    if(error) {
        return (
            <p className="centered focused">{error}</p>
        )
    }

    if(status === 'completed' && (!loadedQuotes || loadedQuotes.length === 0)) {
        return <NoQuotesFound />
    }

    return (
        <QuoteList quotes={loadedQuotes}/>
    );
};

export default AllQuotes;