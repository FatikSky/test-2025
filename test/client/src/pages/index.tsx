import LinkButton from "@/components/LinkButton";
import { _Link, _Home } from "../types";
import axios from "axios";
import edit from "../../public/edit.svg";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";

interface Props {
  home: _Home;
  linkList: _Link[];
};

export default function Home({ home, linkList } : Props) {
  return (
    <section className="flex-container min-h-svh w-svw">
    <div className="fixed bottom-[20px] right-[20px] p-[5px]
    bg-white hover:bg-[#b2b7dc] rounded-full shadow-[0px_2px_16px_#0f172a4f]">
      <Link href="/edit">
        <img className="size-[36px]" src={edit.src}/>
      </Link>
    </div>
    <div className="flex flex-col gap-[36px] p-[36px_16px] max-w-lg w-full">
    <div className="flex-container flex-col gap-[24px]">
      <img className="size-[128px] rounded-full object-cover" src={home.image}/>
      <div className="flex-container flex-col gap-[8px]">
        <div className="flex-container">
          <h5 className="text-slate-950 text-2xl font-semibold">{home.fullName}</h5>
          <img className="size-[12px] ml-1" src="https://relink.is/_next/image?url=%2Fassets%2Ftick.svg&w=16&q=75"/>
        </div>
      <p className="text-slate-600 text-sm font-medium">{home.description}</p>
      </div>
    </div>
    <ul className="flex flex-col gap-[16px]">
      {linkList.map((item) => {
        return <li key={item.id}><LinkButton item={item}></LinkButton></li>;
      })}
    </ul>
    <a href="https://relink.is" className="flex-container gap-[4px]">
      <p className="text-slate-600 opacity-75 text-sm font-medium">Powered by</p>
      <img className="h-[12px] opacity-75" src="https://relink.is/_next/image?url=%2Frelink-landing.svg&w=48&q=75"/>
    </a>
    </div>
    </section>
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