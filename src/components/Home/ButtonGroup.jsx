import { motion } from "framer-motion"
import { chunk } from "lodash"
import { useQuery, useQueries } from "@tanstack/react-query"
import { useBoundStore } from "../../utils/storeBinder"
import links from "../../utils/initalLinks"
import SitePreviewBadge from "./SitePreviewBadge"
import { useEffect } from "react"

export default function ButtonGroup() {
  const chunks = chunk(links, 6)

  const rowConfigs = {
    0: 'bottom-2 z-50',
    1: 'bottom-6 z-40',
    2: 'bottom-10 z-30',
    3: 'bottom-12 z-20',
    4: 'bottom-16 z-10',
  }

  const fetchInitial = async(link) => {
    return fetch(`/`, {
      mode: 'no-cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(res => res.data)
  }

  const { isPending, error, data, isFetching } = useQueries({
    queries: links.map((link) => ({
      queryKey: ['post', link],
      queryFn: () => fetchInitial(link),
    }))
  })

  if(isPending) return <></>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div className='hidden md:flex absolute bottom-20 w-full flex-col-reverse'>
      {chunks.map((chunk, chunkIndex) =>
        <motion.div
          key={chunkIndex}
          className={`flex flex-row justify-center items-center absolute ${rowConfigs[chunkIndex]} w-full`}
        >
          {chunk.map((link, index) =>
            <SitePreviewBadge
              key={index}
              rotateKey={chunkIndex}
            />
          )}
        </motion.div>
      )}
    </div>
  )
}
