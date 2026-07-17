import svgPaths from "./svg-35glremfvc";
import imgImageWithFallback from "./cc64bd176408bec084b4659295c112893ff5c8f4.png";
import imgT9MGe3Sywa7BPuAqzu0Bf1 from "./e58d9116dd046dfecb5aa75bd38e8ee6ec297d83.png";
import imgOJdIpA6YgIN9HlF3GTjD1 from "./26dfeb3c3557424db00c84fa4944c76619266f78.png";
import imgImageWithFallback1 from "./7713c971b02cf27d34d78c923dad47d8dc63dee7.png";
import imgImageWithFallback2 from "./7b4a6293869d622fcadb82d7f5da0b0fa026e650.png";
import imgImageWithFallback3 from "./fbf7952617afb64621cd9611c5aa1affdf33b0e5.png";
import imgImageWithFallback4 from "./56b37bace9069c6b5f090585da6dcdeabe3fa38e.png";
import imgImageWithFallback5 from "./2e2062dbc0a72e503ece6da41555b0b2d1760af0.png";
import imgImageWithFallback6 from "./a85220379f09fd3800d29f7cec2ab869b4c58214.png";
import imgImageWithFallback7 from "./166d42fd594bb5a1ced99b0516e2a644394f112e.png";
import imgImageWithFallback8 from "./83bfd9ec56eb13dc52814c4af110cfb6be03a5c4.png";
import imgImageWithFallback9 from "./feee5112f01dd8b05c3261c99982bce8d9720ff4.png";
import imgImageWithFallback10 from "./bd1c747aad5bfe28c6334e8bb1781424879ee571.png";

function Icon() {
  return (
    <div className="relative shrink-0 size-[22px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
        <g id="Icon">
          <path d={svgPaths.p111cfd00} id="Vector" stroke="var(--stroke-0, #3D2B1F)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.29167" />
        </g>
      </svg>
    </div>
  );
}

function BackBtn() {
  return (
    <div className="relative shrink-0" data-name="BackBtn">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Icon />
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p className="[word-break:break-word] font-['Nunito:Black',sans-serif] font-black leading-[27px] relative shrink-0 text-[#3d2b1f] text-[18px] whitespace-nowrap">Gym</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p className="[word-break:break-word] font-['Nunito:Regular',sans-serif] font-normal leading-[16.5px] relative shrink-0 text-[#9b8870] text-[11px] whitespace-nowrap">Move, sweat, recover</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="flex-[277_0_0] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container3 />
        <Container4 />
      </div>
    </div>
  );
}

function ImageWithFallback() {
  return (
    <div className="relative shrink-0 size-[34px]" data-name="ImageWithFallback">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-contain pointer-events-none size-full" src={imgImageWithFallback} />
    </div>
  );
}

function Container1() {
  return (
    <div className="bg-[#e6f0ee] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[10px] items-center pb-[8px] pt-[62px] px-[20px] relative size-full">
          <BackBtn />
          <Container2 />
          <ImageWithFallback />
        </div>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute h-[413.555px] left-0 top-0 w-[393px]" style={{ backgroundImage: "linear-gradient(174.74deg, rgb(228, 239, 235) 3.6706%, rgb(208, 228, 222) 96.329%)" }} data-name="Container">
      <div className="absolute left-[181.5px] size-[179px] top-[81px]" data-name="T9MGe3Sywa7BPuAQZU0BF 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgT9MGe3Sywa7BPuAqzu0Bf1} />
      </div>
    </div>
  );
}

function Container8() {
  return <div className="absolute drop-shadow-[0px_2px_5px_rgba(0,0,0,0.18)] h-[91px] left-[174px] top-[57px] w-[69px]" data-name="Container" />;
}

function ImageWithFallback3() {
  return (
    <div className="absolute h-[79px] left-[45px] top-[60px] w-[93px]" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgImageWithFallback3} />
    </div>
  );
}

function ImageWithFallback2() {
  return (
    <div className="h-[152px] relative shrink-0 w-[182px]" data-name="ImageWithFallback">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-contain pointer-events-none size-full" src={imgImageWithFallback2} />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <ImageWithFallback3 />
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute content-stretch drop-shadow-[0px_4px_10px_rgba(0,0,0,0.2)] flex flex-col h-[178px] items-start left-[109px] top-[33px] w-[223px]" data-name="Container">
      <ImageWithFallback2 />
    </div>
  );
}

function ImageWithFallback1() {
  return (
    <div className="absolute h-[270px] left-[-50px] overflow-clip top-0 w-[253px]" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgImageWithFallback1} />
      <Container8 />
      <Container9 />
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute bg-gradient-to-b from-[#d8c8a8] h-[370px] left-[0.5px] to-[#c8b898] top-[369px] w-[393px]" data-name="Container">
      <div className="absolute left-[184px] size-[209px] top-[-121px]" data-name="oJDIpA6YG_iN9hlF3GTjD 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgOJdIpA6YgIN9HlF3GTjD1} />
      </div>
      <ImageWithFallback1 />
    </div>
  );
}

function Container10() {
  return <div className="absolute bg-[rgba(180,210,200,0.3)] h-[413.555px] left-[58.95px] top-0 w-px" data-name="Container" />;
}

function Container11() {
  return <div className="absolute bg-[rgba(180,210,200,0.3)] h-[413.555px] left-[137.55px] top-0 w-px" data-name="Container" />;
}

function Container12() {
  return <div className="absolute bg-[rgba(180,210,200,0.3)] h-[413.555px] left-[216.15px] top-0 w-px" data-name="Container" />;
}

function Container13() {
  return <div className="absolute bg-[rgba(180,210,200,0.3)] h-[413.555px] left-[294.75px] top-0 w-px" data-name="Container" />;
}

function Container14() {
  return <div className="absolute bg-[rgba(160,130,90,0.25)] h-[324.945px] left-[39.3px] top-[413.55px] w-px" data-name="Container" />;
}

function Container15() {
  return <div className="absolute bg-[rgba(160,130,90,0.25)] h-[324.945px] left-[117.9px] top-[413.55px] w-px" data-name="Container" />;
}

function Container16() {
  return <div className="absolute bg-[rgba(160,130,90,0.25)] h-[324.945px] left-[196.5px] top-[413.55px] w-px" data-name="Container" />;
}

function Container17() {
  return <div className="absolute bg-[rgba(160,130,90,0.25)] h-[324.945px] left-[275.09px] top-[413.55px] w-px" data-name="Container" />;
}

function Container18() {
  return <div className="absolute bg-[rgba(160,130,90,0.25)] h-[324.945px] left-[353.7px] top-[413.55px] w-px" data-name="Container" />;
}

function ImageWithFallback4() {
  return (
    <div className="h-[172px] relative shrink-0 w-[157px]" data-name="ImageWithFallback">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-contain pointer-events-none size-full" src={imgImageWithFallback4} />
    </div>
  );
}

function Container19() {
  return (
    <div className="absolute content-stretch drop-shadow-[1px_3px_8px_rgba(0,0,0,0.18)] flex flex-col items-start left-[16px] top-[51.69px] w-[96px]" data-name="Container">
      <ImageWithFallback4 />
    </div>
  );
}

function Container20() {
  return <div className="absolute bg-[rgba(80,100,90,0.18)] h-[14px] left-[8px] rounded-[6px] top-[516.95px] w-[377px]" data-name="Container" />;
}

function ImageWithFallback5() {
  return (
    <div className="absolute h-[259px] left-[204.5px] top-[453px] w-[198px]" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgImageWithFallback5} />
    </div>
  );
}

function ImageWithFallback6() {
  return (
    <div className="absolute h-[110px] left-[7.5px] top-[584px] w-[115px]" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgImageWithFallback} />
    </div>
  );
}

function Text() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative size-full">
        <p className="[word-break:break-word] font-['Nunito:SemiBold',sans-serif] font-semibold leading-[22.5px] relative shrink-0 text-[#5c3d6e] text-[15px] text-center whitespace-nowrap">🏃</p>
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative size-full">
        <p className="[word-break:break-word] font-['Nunito:Black',sans-serif] font-black leading-[19.5px] relative shrink-0 text-[#fff8f0] text-[13px] text-center whitespace-nowrap">{`Today's Activity`}</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="bg-[#3d2b1f] relative rounded-[24px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7px] items-center px-[22px] py-[10px] relative size-full">
          <Text />
          <Text1 />
        </div>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="absolute content-stretch drop-shadow-[0px_4px_12px_rgba(0,0,0,0.22)] flex flex-col items-start justify-center left-[113.5px] top-[651.45px] w-[166px]" data-name="Button">
      <Container21 />
    </div>
  );
}

function Container5() {
  return (
    <div className="bg-[#c0cec8] flex-[738.5_0_0] min-h-px relative w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <Container6 />
        <Container7 />
        <Container10 />
        <Container11 />
        <Container12 />
        <Container13 />
        <Container14 />
        <Container15 />
        <Container16 />
        <Container17 />
        <Container18 />
        <Container19 />
        <Container20 />
        <ImageWithFallback5 />
        <ImageWithFallback6 />
        <Button />
      </div>
    </div>
  );
}

function GymDetailScreen() {
  return (
    <div className="h-[852px] relative shrink-0 w-full" data-name="GymDetailScreen">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <Container1 />
        <Container5 />
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="relative shrink-0" data-name="Heading 2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p className="[word-break:break-word] font-['Nunito:Black',sans-serif] font-black leading-[33px] relative shrink-0 text-[#3d2b1f] text-[22px] whitespace-nowrap">Menu</p>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M15 5L5 15" id="Vector" stroke="var(--stroke-0, #9B8870)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M5 5L15 15" id="Vector_2" stroke="var(--stroke-0, #9B8870)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="relative shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center relative size-full">
        <Icon1 />
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pb-[18px] px-[28px] relative size-full">
          <Heading />
          <Button1 />
        </div>
      </div>
    </div>
  );
}

function ImageWithFallback7() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="ImageWithFallback">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-contain pointer-events-none size-full" src={imgImageWithFallback6} />
    </div>
  );
}

function Text2() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative size-full">
        <p className="[word-break:break-word] font-['Nunito:Bold',sans-serif] font-bold leading-[24px] relative shrink-0 text-[#3d2b1f] text-[16px] text-center whitespace-nowrap">Kitchen</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="relative shrink-0 w-[283px]" data-name="Button">
      <div aria-hidden className="absolute border-[rgba(61,43,31,0.1)] border-b border-solid border-t inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[14px] items-center px-[24px] py-[15px] relative size-full">
        <ImageWithFallback7 />
        <Text2 />
      </div>
    </div>
  );
}

function ImageWithFallback8() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="ImageWithFallback">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-contain pointer-events-none size-full" src={imgImageWithFallback} />
    </div>
  );
}

function Text3() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative size-full">
        <p className="[word-break:break-word] font-['Nunito:Bold',sans-serif] font-bold leading-[24px] relative shrink-0 text-[#3d2b1f] text-[16px] text-center whitespace-nowrap">Gym</p>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="relative shrink-0 w-[283px]" data-name="Button">
      <div aria-hidden className="absolute border-[rgba(61,43,31,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[14px] items-center pb-[15px] pt-[14px] px-[24px] relative size-full">
        <ImageWithFallback8 />
        <Text3 />
      </div>
    </div>
  );
}

function ImageWithFallback9() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="ImageWithFallback">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-contain pointer-events-none size-full" src={imgImageWithFallback7} />
    </div>
  );
}

function Text4() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative size-full">
        <p className="[word-break:break-word] font-['Nunito:Bold',sans-serif] font-bold leading-[24px] relative shrink-0 text-[#3d2b1f] text-[16px] text-center whitespace-nowrap">Bedroom</p>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="relative shrink-0 w-[283px]" data-name="Button">
      <div aria-hidden className="absolute border-[rgba(61,43,31,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[14px] items-center pb-[15px] pt-[14px] px-[24px] relative size-full">
        <ImageWithFallback9 />
        <Text4 />
      </div>
    </div>
  );
}

function ImageWithFallback10() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="ImageWithFallback">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-contain pointer-events-none size-full" src={imgImageWithFallback8} />
    </div>
  );
}

function Text5() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative size-full">
        <p className="[word-break:break-word] font-['Nunito:Bold',sans-serif] font-bold leading-[24px] relative shrink-0 text-[#3d2b1f] text-[16px] text-center whitespace-nowrap">Postcard World</p>
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div className="relative shrink-0 w-[283px]" data-name="Button">
      <div aria-hidden className="absolute border-[rgba(61,43,31,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[14px] items-center pb-[15px] pt-[14px] px-[24px] relative size-full">
        <ImageWithFallback10 />
        <Text5 />
      </div>
    </div>
  );
}

function ImageWithFallback11() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="ImageWithFallback">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-contain pointer-events-none size-full" src={imgImageWithFallback2} />
    </div>
  );
}

function Text6() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative size-full">
        <p className="[word-break:break-word] font-['Nunito:Bold',sans-serif] font-bold leading-[24px] relative shrink-0 text-[#3d2b1f] text-[16px] text-center whitespace-nowrap">Companion Space</p>
      </div>
    </div>
  );
}

function Button6() {
  return (
    <div className="relative shrink-0 w-[283px]" data-name="Button">
      <div aria-hidden className="absolute border-[rgba(61,43,31,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[14px] items-center pb-[15px] pt-[14px] px-[24px] relative size-full">
        <ImageWithFallback11 />
        <Text6 />
      </div>
    </div>
  );
}

function ImageWithFallback12() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="ImageWithFallback">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-contain pointer-events-none size-full" src={imgImageWithFallback9} />
    </div>
  );
}

function Text7() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative size-full">
        <p className="[word-break:break-word] font-['Nunito:Bold',sans-serif] font-bold leading-[24px] relative shrink-0 text-[#3d2b1f] text-[16px] text-center whitespace-nowrap">Wardrobe</p>
      </div>
    </div>
  );
}

function Button7() {
  return (
    <div className="relative shrink-0 w-[283px]" data-name="Button">
      <div aria-hidden className="absolute border-[rgba(61,43,31,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[14px] items-center pb-[15px] pt-[14px] px-[24px] relative size-full">
        <ImageWithFallback12 />
        <Text7 />
      </div>
    </div>
  );
}

function ImageWithFallback13() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="ImageWithFallback">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-contain pointer-events-none size-full" src={imgImageWithFallback9} />
    </div>
  );
}

function Text8() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative size-full">
        <p className="[word-break:break-word] font-['Nunito:Bold',sans-serif] font-bold leading-[24px] relative shrink-0 text-[#3d2b1f] text-[16px] text-center whitespace-nowrap">Rewards</p>
      </div>
    </div>
  );
}

function Button8() {
  return (
    <div className="relative shrink-0 w-[283px]" data-name="Button">
      <div aria-hidden className="absolute border-[rgba(61,43,31,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[14px] items-center pb-[15px] pt-[14px] px-[24px] relative size-full">
        <ImageWithFallback13 />
        <Text8 />
      </div>
    </div>
  );
}

function ImageWithFallback14() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="ImageWithFallback">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-contain pointer-events-none size-full" src={imgImageWithFallback10} />
    </div>
  );
}

function Text9() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative size-full">
        <p className="[word-break:break-word] font-['Nunito:Bold',sans-serif] font-bold leading-[24px] relative shrink-0 text-[#3d2b1f] text-[16px] text-center whitespace-nowrap">Settings</p>
      </div>
    </div>
  );
}

function Button9() {
  return (
    <div className="relative shrink-0 w-[283px]" data-name="Button">
      <div aria-hidden className="absolute border-[rgba(61,43,31,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[14px] items-center pb-[15px] pt-[14px] px-[24px] relative size-full">
        <ImageWithFallback14 />
        <Text9 />
      </div>
    </div>
  );
}

function MenuDrawer() {
  return (
    <div className="absolute bg-[#f8f4ec] drop-shadow-[4px_0px_20px_rgba(0,0,0,0.22)] h-[852px] left-[-288.64px] rounded-br-[28px] rounded-tr-[28px] top-0 w-[283px]" data-name="MenuDrawer">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[68px] relative size-full">
        <Container22 />
        <Button2 />
        <Button3 />
        <Button4 />
        <Button5 />
        <Button6 />
        <Button7 />
        <Button8 />
        <Button9 />
      </div>
    </div>
  );
}

function Container23() {
  return <div className="absolute bg-[#0a0a0a] h-[34px] left-[136.5px] rounded-[20px] top-[14px] w-[120px]" data-name="Container" />;
}

function Container() {
  return (
    <div className="h-[852px] relative rounded-[54px] shadow-[0px_50px_100px_0px_rgba(0,0,0,0.4),0px_0px_0px_2px_rgba(255,255,255,0.2)] shrink-0 w-[393px]" data-name="Container">
      <div aria-hidden className="absolute bg-[#f8f4ee] bg-clip-padding border-0 border-[transparent] border-solid inset-0 pointer-events-none rounded-[54px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <GymDetailScreen />
        <MenuDrawer />
        <Container23 />
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_0px_1px_rgba(0,0,0,0.06)]" />
    </div>
  );
}

function PhoneShell() {
  return (
    <div className="bg-[#c8c4b8] h-[898px] relative shrink-0 w-full" data-name="PhoneShell">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center py-[20px] relative size-full">
        <Container />
      </div>
    </div>
  );
}

export default function Document() {
  return (
    <div className="bg-[#fff5f0] content-stretch flex flex-col items-start relative size-full" data-name="Document">
      <PhoneShell />
    </div>
  );
}