import { Route, useParams, Link, useRouteMatch } from 'react-router-dom';
import { Fragment, useEffect } from 'react';
import Comments from "../components/comments/Comments";
import HighLightedQuoted from '../components/quotes/HighlightedQuote';
import useHttp from '../hooks/use-http';
import { getSingleQuote } from '../lib/api';
import LoadingSpinner from '../components/UI/LoadingSpinner';

// const DUMMY_QUOTES = [
//     { id: "q1", author: "Sheldon", text: "Success is a journey, not a destination"},
//     { id: "q2", author: "Kuo", text: "If this life only hands you lemons, throw them back and ask for a piece of pizza"}
// ]

const QuoteDetail = () => {
    const {quoteId} = useParams();
    // const quote = DUMMY_QUOTES.find(quote => quote.id === quoteId);
    const match = useRouteMatch();
    const {sendRequest, status, data: loadedQuote, error} = useHttp(getSingleQuote, true);

    useEffect(() => {
        sendRequest(quoteId);
    }, [sendRequest, quoteId]);

    if(status === 'pending') {
        return (
            <div className='centered'>
                <LoadingSpinner />
            </div>
        );
    }

    if(error) {
        return (
            <p className='centered'>{error}</p>
        );
    }

    if(!loadedQuote.text) {
        return <p>No Quote found!</p>
    }

    return (
        <Fragment>
            <HighLightedQuoted 
                text={loadedQuote.text}
                author={loadedQuote.author}
            />
            <Route path={match.path} exact>
                <div className='centered'>
                    <Link className='btn--flat' to={`${match.url}/comments`}>
                        Load Comments
                    </Link>
                </div>
            </Route>

            <Route path={`${match.path}/comments`}>
                <Comments />
            </Route>
        </Fragment>
    );
};

export default QuoteDetail;