import React, {useMemo} from "react";
import {BaseLayout} from "./BaseLayout.tsx";
import {useBooks} from "../features/book/getBooks.tsx";
import {Value} from "react-query/types/devtools/Explorer";
import {bookDataDto} from "../features/book/bookDataDto.ts";
import Carousel from "react-multi-carousel";
import {GetBookById} from "../features/book/getBookById.tsx";

export const MainPageLayout: React.FC = () => {
    return (
        <BaseLayout>
            <BookCarousel/>
        </BaseLayout>
    )
};

const BookCarousel: React.FC = () => {
    const {data: books} = useBooks();

    const items = useMemo(() => {
        return books?.map((book) => ({
                name: book.name,
                author: book.author,
                description: book.description,
                id: book.id,
            })
        )
    }, [books]);

    const responsive = {
        desktop: {
            breakpoint: {max: 3000, min: 1024},
            items: 3,
            slidesToSlide: 3 // optional, default to 1.
        }
    };

    const bookElements = items?.map((book) => (
        <div className="shadow-lg h-[550px] w-full" onClick={() => GetBookById(book.id)}>
            <img src="" alt={book.name}></img>
            <p className="text-black">{book.name}</p>
        </div>
    ));

    return bookElements && (
        <Carousel className="w-full" responsive={responsive}>
            {bookElements && bookElements}
        </Carousel>
    )
}
