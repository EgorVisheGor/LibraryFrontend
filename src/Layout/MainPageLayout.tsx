import React from "react";
import {BaseLayout} from "./BaseLayout.tsx";
import {useBooks} from "../features/book/getBooks.tsx";
import Carousel from "react-multi-carousel";

import {GetCoverUrl} from "../features/images/GetImage.tsx";
import {GetAuthorById} from "../features/author/GetAuthor.tsx";

export const MainPageLayout: React.FC = () => {
    return (
        <BaseLayout>
            <BookCarousel/>
        </BaseLayout>
    )
};

const BookCarousel: React.FC = () => {
    const {data: books} = useBooks();

    const responsive = {
        desktop: {
            breakpoint: {max: 3000, min: 1024},
            items: 1,
            slidesToSlide: 1
        }
    };

    const bookElements = books?.map((book) => (
        <div className="shadow-mg h-[550px] w-full flex flex-row" onClick={() => {
        }}>
            <img src={GetCoverUrl(book.coverUrl)} alt={book.title} className="rounded-lg h-full left-0 w-1\3"></img>
            <div className="right-0 top-0">
                <p className="text-black text-left font-extrabold text-4xl">{book.title}</p>
                <p></p>
                <p className="text-black text-left text-xl">{book.description}</p>
            </div>
        </div>
    ));

    return bookElements && (
        <Carousel
            arrows={true}
            swipeable={false}
            draggable={false}
            showDots={true}
            responsive={responsive}
            ssr={false}
            infinite={true}
            autoPlaySpeed={1000}
            keyBoardControl={true}
            customTransition=""
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
            className="w-full overflow-hidden"
        >
            {bookElements && bookElements}
        </Carousel>
    )
}
