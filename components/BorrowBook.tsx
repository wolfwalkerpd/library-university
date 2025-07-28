'use client'

import React, { useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { borrowBook } from "@/lib/actions/book";


interface Props{
    userId:string;
    bookId:string;
    borrowingEligibility:{
        isEligible:boolean;
        message:string;
    }
}

const BorrowBook = ({userId, bookId, borrowingEligibility:{isEligible, message}} : Props) => {

    const router = useRouter();
    const [borrowing,setBorrowing] = useState(false);

    const handleBorrowBook = async() => {
        if(!isEligible){
            toast('error',{
                description:message,
                //@ts-ignore
                variant:'destructive',
            })
        } 

        setBorrowing(true);

        try {
            const result = await borrowBook({bookId, userId})

            if(result.success){
                toast('success', {
                    description:'Book Borrowed successfully',
                    //@ts-ignore
                    variant:'success'
                })

                router.push("/my-profile")
            }else{
                toast('Error', {
                    description:'An error occurred while borrowing the book',
                    //@ts-ignore
                    variant:'destructive'
                })
            }
        } catch (error) {
            toast('error', {
                description:'An error occurred while borrowing the book',
                    //@ts-ignore
                variant:'destructive',
            })
        } finally{
            setBorrowing(false);
        }
    }

  return (
    <Button className="book-overview_btn" onClick={handleBorrowBook} disabled={borrowing}>
      <Image src="/icons/book.svg" alt="book" width={20} height={20} />
      <p className="font-bebas-neue text-xl text-dark-100">{borrowing ? 'Borrowing ...' : 'Borrow Book'}</p>
    </Button>
  );
};

export default BorrowBook;
