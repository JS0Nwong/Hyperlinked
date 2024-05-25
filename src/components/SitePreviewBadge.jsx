
export default function SitePreviewBadge(data) {
    const siteData = data.data
    const displayLink = siteData.link.replace(/^(?:https?:\/\/)?(?:www\.)?(.*?)(?:\/)?$/i, "$1")

    return (
        <a
            href={siteData.link}
            target='_blank'
            className='mt-5 w-fit pt-5 pb-5 pl-2 pr-2 rounded-md h-7 bg-neutral-50 dark:bg-neutral-900 border-neutral-300 dark:border-neutral-800 border flex flex-row items-center text-ellipsis overflow-hidden'>
            <img className="w-4 h-4 mr-2 ml-1" src={siteData.favIcon} />
            <p className='w-44 text-neutral-800 text-sm font-medium ml-1 mr-1 dark:text-neutral-200 text-nowrap text-ellipsis overflow-hidden' >
                {siteData.description}</p>
            <p className='text-neutral-500 ml-1 mr-1 text-xs' >
                {displayLink}
            </p>
        </a>
    )
}
