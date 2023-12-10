"use client";
import MainContainer from "@/components/MainContainer/MainContainer";
import { useSession } from "next-auth/react";

type Props = {
  params: {
    id: string;
  };
};

export default function User({ params: { id } }: Props) {
  
  const session = useSession();
  console.log(session);
  return (
    <MainContainer> 
      <div className="">
        <div>
          <div className="mx-10 my-5">
            <div className="bg-yellow-500 text-orange-700 h-56 w-56 rounded-full ">
              <image>asd</image>
            </div>
          </div>
          <label>вы:{`user ${id}`}</label>
        </div>
      </div>    
    </MainContainer>
  );
}
