import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileTextIcon, CheckIcon, KeyboardIcon } from '@radix-ui/react-icons'
import LinkPreview from './LinkPreview'
import hljs from 'highlight.js'
import "highlight.js/styles/base16/dracula.css"

function CodeSnippet({ snippet, langauge, edit, handleChanges, index, copy, copied, description }) {
    const highlightCode = hljs.highlight(snippet, { language: langauge }).value
    return edit ? (
        <textarea
            autoFocus={edit}
            defaultValue={snippet}
            placeholder=''
            autoComplete='off'
            type='text'
            className='w-full max-w-full h-full text-neutral-800 dark:text-neutral-200 text-sm font-medium ml-1 mr-1 text-nowrap text-ellipsis overflow-hidden bg-transparent z-50 focus:outline-none'
            onBlur={(e) => handleChanges(e.target.value, index)}
            onFocus={(e) => e.target.select()}
        />
    ) : (
        <div className='flex relative w-full max-w-full'>
            <motion.code
                key='code-snippet'
                className='w-full max-w-60 h-full max-h-5 text-neutral-800 dark:text-neutral-200 text-sm font-medium ml-1 mr-1 truncate'
                initial={{ opacity: 1 }}
                animate={{ opacity: copy || copied ? 0 : 1 }}
                exit={{ opacity: 0 }}
                dangerouslySetInnerHTML={{ __html: highlightCode }}
            />
            <p className='text-neutral-500 mx-2 md:mr-4 text-xs max-w-[150px] truncate text-end font-medium'>{description}</p>
        </div>
    )
}

function CopiedIndicator({ copied, copy }) {
    return (
        <AnimatePresence>
            {(copy || copied) && (
                <div className='absolute z-10 flex items-center'>
                    <motion.div
                        key="checkIcon"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-4 h-4 mx-2 md:ml-4 text-neutral-900 dark:text-neutral-50"
                    >
                        <CheckIcon />
                    </motion.div>
                    <motion.p
                        key="copied"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className='relative w-full text-neutral-800 text-sm font-medium mx-1 dark:text-neutral-200 text-nowrap text-ellipsis overflow-hidden '
                    >
                        Copied
                    </motion.p>
                </div>
            )}
        </AnimatePresence>
    );
}

function LinkTitle({ edit, title, handleChanges, index, copy, copied, displayLink }) {
    return edit ? (
        <input
            autoFocus={edit}
            defaultValue={title}
            placeholder=''
            autoComplete='off'
            type='text'
            className='w-full text-neutral-800 dark:text-neutral-200 text-sm font-medium ml-1 mr-1 text-nowrap text-ellipsis overflow-hidden bg-transparent z-50 focus:outline-none'
            onBlur={(e) => handleChanges(e.target.value, index)}
            onFocus={(e) => e.target.select()}
        />
    ) : (
        <motion.p
            key='site-title'
            initial={{ opacity: 1 }}
            animate={{ opacity: copy || copied ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className='w-full flex items-center text-neutral-800 dark:text-neutral-200 text-sm font-medium ml-1 mr-1 text-nowrap text-ellipsis overflow-hidden'
            id='site-title'
        >
            {title}
            <span className='text-neutral-500 mx-2 md:mr-4 text-xs max-w-[150px] truncate text-end'>
                {displayLink}
            </span>
        </motion.p>
    );
}

function LinkIcon({ isHex, isRGB, isCode, displayLink, copy, copied }) {
    if (isHex || isRGB) {
        return (
            <motion.div
                key='colorCircle'
                initial={{ opacity: 1 }}
                animate={{ opacity: copy || copied ? 0 : 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className='w-4 h-4 mx-2 md:ml-4 rounded-full'
                style={{ backgroundColor: displayLink }}
            />
        );
    }

    return (
        <motion.div
            key="fileIcon"
            initial={{ opacity: 1 }}
            animate={{ opacity: copy || copied ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-4 h-4 mx-2 md:ml-4 dark:text-neutral-200 text-neutral-900"
        >
            {isCode ? <KeyboardIcon /> : <FileTextIcon />}
        </motion.div>
    );
}

function LinkContainer({ children, isLink, data, onContext, handleClick, setFocused, setHovered, edit, index, focused }) {
    const Container = isLink ? motion.a : motion.div;

    return (
        <AnimatePresence>
            <Container
                onMouseEnter={() => setFocused(index)}
                onTap={() => setFocused(index)}
                onFocus={() => {
                    setFocused(index);
                    setHovered(true);
                }}
                onHoverStart={() => setHovered(true)}
                onHoverEnd={() => setHovered(false)}
                onContextMenu={onContext}
                onClick={edit ? null : handleClick}
                href={isLink ? data.link : undefined}
                target={isLink ? '_blank' : undefined}
                aria-label='links'
                className='cursor-pointer select-none w-full first:mt-1 py-3 md:px-0.5 md:py-2.5 rounded-md flex flex-row justify-between items-center text-ellipsis relative focus:outline-none'
            >
                {children}
                {!edit && focused === index && (
                    <motion.div
                        layout
                        transition={{
                            duration: 0.1,
                            ease: "linear",
                        }}
                        className="absolute w-full h-full bg-neutral-400/15 dark:bg-neutral-400/10 rounded-lg p-5 md:p-2 z-0"
                        layoutId="highlight"
                    />
                )}
            </Container>
        </AnimatePresence>

    );
}

export default function SavedLinks({
    data,
    index,
    edit,
    handleChanges,
    copy,
    focused,
    setFocused,
    setHovered,
    onContext,
    handleOpenModal
}) {
    const displayLink = data?.link.replace(/^(?:https?:\/\/)?(?:www\.)?(.*?)(?:\/.*?)?$/i, "$1");
    const favIcon = data?.favIcon;
    const description = data?.description;
    const title = data?.title;
    const isCode = hljs.getLanguage(description)?.name.toLowerCase()
    const isLink = description && favIcon;
    const isRGB = data?.link.trim().match(/rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/);
    const isHex = data?.link.trim().match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/);
    const [copied, setCopied] = useState(false);
    const handleClick = () => {
        navigator.clipboard.writeText(data.link);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 1000);
    };

    return (
        <LinkContainer
            isLink={isLink}
            data={data}
            onContext={onContext}
            handleClick={isCode ? () => handleOpenModal(data.link, isCode) : isLink ? null : handleClick}
            setFocused={setFocused}
            setHovered={setHovered}
            edit={edit}
            index={index}
            focused={focused}
        >

            <CopiedIndicator copy={copy} copied={copied} />
            {isLink ? (
                <motion.img
                    key="favicon"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: copy || copied ? 0 : 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="w-4 h-4 mx-2 md:ml-4"
                    src={favIcon}
                />
            ) : (
                <LinkIcon
                    isHex={isHex}
                    isRGB={isRGB}
                    isCode={isCode}
                    displayLink={displayLink}
                    copy={copy}
                    copied={copied}
                />
            )}
            {!isCode && <LinkTitle
                edit={edit}
                title={title || displayLink}
                handleChanges={handleChanges}
                index={index}
                copy={copy}
                copied={copied}
                displayLink={isLink && displayLink}
            />}
            {isCode && <CodeSnippet
                snippet={data.link}
                langauge={isCode}
                edit={edit}
                handleChanges={handleChanges}
                index={index}
                copy={copy}
                copied={copied}
                description={description}
            />}
            <h1 className='text-nowrap text-xs font-semibold tracking-tight text-neutral-500 mx-2 md:mr-4'>{data.dateAdded}</h1>
        </LinkContainer>
    );
}