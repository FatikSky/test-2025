import { _Link } from "../../types";
import axios from "axios";
import { GetServerSidePropsContext } from "next";
import { FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Props {
  link: _Link;
};

export default function Id({ link } : Props) {
    const router = useRouter();

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
     
        const formData = new FormData(event.currentTarget);
        const response = await axios({
            method: "put",
            url: `https://server-theta-one-38.vercel.app/links/${link.id}`,
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        });
        
        router.back();
    };

    async function deleteHandler() {     
        const response = await axios({
            method: "delete",
            url: `https://server-theta-one-38.vercel.app/links/${link.id}`,
            headers: { "Content-Type": "multipart/form-data" },
        });
        
        router.back();
    };

    return (
        <>
        <form className="flex flex-col m-[15px] text-slate-950" onSubmit={onSubmit}>
            <label htmlFor="title" className="font-semibold text-lg">Title:</label>
            <input className="outline-none mb-[15px] max-w-full p-[5px_20px] bg-white hover:bg-[#b2b7dc] rounded-lg inset-shadow-[0px_2px_12px_#0f172a3c]"
                name="title" type="text" defaultValue={link.title}/>
            <label htmlFor="icon" className="font-semibold text-lg">URL for icon:</label>
            <input className="outline-none mb-[15px] max-w-full p-[5px_20px] bg-white hover:bg-[#b2b7dc] rounded-lg inset-shadow-[0px_2px_12px_#0f172a3c]"
                name="icon" type="text" defaultValue={link.icon}/>
            <label htmlFor="url" className="font-semibold text-lg">URL:</label>
            <input className="outline-none mb-[20px] max-w-full p-[5px_20px] bg-white hover:bg-[#b2b7dc] rounded-lg inset-shadow-[0px_2px_12px_#0f172a3c]"
                name="url" type="text" defaultValue={link.url}/>
            <input className="cursor-pointer max-w-max p-[5px_20px] bg-white hover:bg-[#b2b7dc] rounded-lg shadow-[0px_2px_16px_#0f172a4f] font-semibold" type="submit"/>
        </form>
        <div className="max-w-max p-[5px_20px] m-[15px] bg-white hover:bg-[#ffb7b2] cursor-pointer
            rounded-lg shadow-[0px_2px_16px_#ff000082] text-red-950 font-semibold"
            onClick={deleteHandler}>
            Delete
        </div>
        <Link href="/edit">
        <div className="max-w-max p-[5px_20px] m-[40px_15px] bg-white hover:bg-[#b2b7dc]
            rounded-lg shadow-[0px_2px_16px_#0f172a4f] text-slate-950 font-semibold">
            Back
        </div>
        </Link>
        </>
    );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query;
  const response = await axios.get(`https://server-theta-one-38.vercel.app/links/${id}`);
  return {
    props: {
      link: response.data
    }
  };
};