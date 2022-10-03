inspiration: https://github.com/samuelkraft/notion-blog-nextjs

### reason on using swr.

I want the data to fast and up to date. If I use server side props, it takes a little while to load. If i use staticProps, it would be outdated. So i should ise clientSide 'fetcher'. next recommend swr. So i use it.
