import { useRef, useEffect } from "react";

import { Fancybox as NativeFancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

export interface Avatar {
  /* options : {
    Carousel: {
      infinite: boolean
    }
  } */
  options? : object
  delegate?: string
  children?: React.ReactNode 
}

/**
 * 이미지 확대 컴포넌트
 * @description npm install --save \@fancyapps/ui
 * @see https://fancyapps.com/
 * @param props avatar URL
 * @returns 
 */
function Fancybox(props: Avatar) {
  const containerRef = useRef(null);
  useEffect(() => {
    const container = containerRef.current;

    const delegate = props.delegate || "[data-fancybox]";
    const options = props.options || {};

    NativeFancybox.bind(container, delegate, options);

    return () => {
      NativeFancybox.unbind(container);
      NativeFancybox.close();
    };
  });

  return <div 
            style={{ width:"115px", height:"115px"}}
            ref={containerRef}
          >
            {props.children}
          </div>;
}

export default Fancybox;
