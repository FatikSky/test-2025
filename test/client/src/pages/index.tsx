import LinkButton from "@/components/LinkButton";
import { _Link } from "./types";
import axios from "axios";
import { GetServerSidePropsContext } from "next";

interface Props {
  linkList: _Link[];
};

export default function Home({ linkList } : Props) {
  return (
    <section className="flex-container min-h-svh w-svw">
    <div className="flex flex-col gap-[36px] p-[36px_16px] max-w-lg w-full">
    <div className="flex-container flex-col gap-[24px]">
      <img className="size-[128px] rounded-full object-cover" src="https://uploads.relink.is/usercontent/Screenshot_20241108-115229_ez0y5NvZ.png"/>
      <div className="flex-container flex-col gap-[8px]">
        <div className="flex-container">
          <h5 className="text-slate-950 text-2xl font-semibold">Nicat Manafov</h5>
          <img className="size-[12px] ml-1" src="https://relink.is/_next/image?url=%2Fassets%2Ftick.svg&w=16&q=75"/>
        </div>
      <p className="text-slate-600 text-sm font-medium">15+ years experience e-commerce ⚡</p>
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
  const response = await axios.get(`http://localhost:3000/links`);
  return {
    props: {
      linkList: response.data
    }
  };
};