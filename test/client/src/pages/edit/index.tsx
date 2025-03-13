import { _Home, _Link } from "../../types";
import axios from "axios";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

interface Props {
  home: _Home;
  linkList: _Link[];
};

export default function Edit({ home, linkList } : Props) {
  const router = useRouter(); 

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
 
    const formData = new FormData(event.currentTarget);
    const response = await axios({
      method: "put",
      url: `https://server-theta-one-38.vercel.app/home`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
    
    router.back();
  };

  return (
    <>
    <form className="flex flex-col m-[15px] text-slate-950" onSubmit={onSubmit}>
      <label htmlFor="image" className="font-semibold text-lg">Image URL:</label>
      <input className="outline-none mb-[15px] max-w-full p-[5px_20px] bg-white hover:bg-[#b2b7dc] rounded-lg inset-shadow-[0px_2px_12px_#0f172a3c]"
          name="image" type="text" defaultValue={home.image}/>
      <label htmlFor="fullName" className="font-semibold text-lg">Full name:</label>
      <input className="outline-none mb-[15px] max-w-full p-[5px_20px] bg-white hover:bg-[#b2b7dc] rounded-lg inset-shadow-[0px_2px_12px_#0f172a3c]"
          name="fullName" type="text" defaultValue={home.fullName}/>
      <label htmlFor="description" className="font-semibold text-lg">Description:</label>
      <input className="outline-none mb-[20px] max-w-full p-[5px_20px] bg-white hover:bg-[#b2b7dc] rounded-lg inset-shadow-[0px_2px_12px_#0f172a3c]"
          name="description" type="text" defaultValue={home.description}/>
      <input className="cursor-pointer max-w-max p-[5px_20px] bg-white hover:bg-[#b2b7dc] rounded-lg shadow-[0px_2px_16px_#0f172a4f] font-semibold" type="submit"/>
    </form>
    <ul className="flex flex-col gap-[20px] m-[15px] text-slate-950">
      {linkList.map((item) => {
        return(
        <li key={item.id} className="max-w-2xl p-[20px] bg-white hover:bg-[#b2b7dc] rounded-lg shadow-[0px_2px_16px_#0f172a4f]">
          <Link href={"/edit/" + item.id}>
            <p><strong>Title:</strong> {item.title}</p>
            <p><strong>Icon URL:</strong> {item.icon}</p>
            <p><strong>Link's URL:</strong> {item.url}</p>
          </Link>
        </li>);
      })}
    </ul>
    <div className="flex-container">
      <Link href="/edit/add">
      <div className="max-w-max p-[5px_20px] m-[20px_15px] bg-white hover:bg-[#b2b7dc]
          rounded-lg shadow-[0px_2px_16px_#0f172a4f] text-slate-950 font-semibold text-2xl">
          Add new link
      </div>
      </Link>
      <Link href="/">
      <div className="max-w-max p-[5px_20px] m-[20px_15px] bg-white hover:bg-[#b2b7dc]
          rounded-lg shadow-[0px_2px_16px_#0f172a4f] text-slate-950 font-semibold text-2xl">
          Back
      </div>
      </Link>
    </div>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const responseHome = await axios.get(`https://server-theta-one-38.vercel.app/home`);
  const responseLinks = await axios.get(`https://server-theta-one-38.vercel.app/links`);
  return {
    props: {
      home: responseHome.data,
      linkList: responseLinks.data
    }
  };
};