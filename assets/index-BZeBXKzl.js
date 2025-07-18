import{j as e}from"./index-BSNPDyZS.js";import{r as f}from"./vendor-DPNQA5jQ.js";import{C as g}from"./index-DivdOlCA.js";const h=f.forwardRef(({options:c,label:o,size:m="md",variant:i="default",error:s,fullWidth:n=!1,className:p="",icon:r,helperText:l,disabled:t,...x},d)=>{const u={sm:"text-xs py-1 px-2",md:"text-sm py-2 px-3",lg:"text-base py-2.5 px-4"},b={default:"bg-white border-primary-200 hover:border-primary-300",outline:"bg-transparent border-secondary-200 hover:border-secondary-300",ghost:"bg-transparent border-transparent hover:bg-secondary-50"},y=`
      select-component
      block rounded border 
      focus:outline-none focus:ring-1 focus:ring-primary-400
      appearance-none
      transition-colors
      pr-9 
      ${u[m]} 
      ${b[i]}
      ${t?"opacity-60 cursor-not-allowed bg-gray-100":"cursor-pointer"}
      ${n?"w-full":""}
      ${s?"border-error-500 focus:ring-error-500":""}
      ${p}
    `;return e.jsxs("div",{className:`select-container ${n?"w-full":"inline-block"}`,children:[o&&e.jsx("label",{className:"block text-sm font-medium text-secondary-700 mb-1",children:o}),e.jsxs("div",{className:"relative",children:[r&&e.jsx("span",{className:"absolute left-3 top-1/2 transform -translate-y-1/2",children:r}),e.jsx("select",{ref:d,className:`${y} ${r?"pl-9":""}`,disabled:t,...x,children:c.map(a=>e.jsx("option",{value:a.value,children:a.label},a.value))}),e.jsx(g,{className:`absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none ${t?"text-gray-400":"text-gray-600"}`,size:16})]}),l&&!s&&e.jsx("p",{className:"mt-1 text-xs text-secondary-500",children:l}),s&&e.jsx("p",{className:"mt-1 text-xs text-error-500",children:s})]})});h.displayName="Select";export{h as S};
