import Head from 'next/head'
import InfoBox from '@components/InfoBox'
import { NextPage } from 'next'
import Layout from '@layouts/default'
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon, cx, Icon } from '@vechaiui/react'

const _404Page: NextPage = () => {
  return (
    <Layout>
      <InfoBox>
        <Head>
          <title>HairSalon - 404</title>
        </Head>
        <div className="mx-3 text-center">
          <h1 className="text-9xl pt-20">404</h1>
          <h2 className="p-1 pb-20">This page could not be found...</h2>
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex items-center justify-between w-full px-4 py-2 rounded-base cursor-base hover:bg-neutral-100 dark:hover:bg-blackAlpha-50 focus:outline-none">
                  <span>Show more...</span>
                  <span
                    className={cx(
                      'w-5 h-5 rounded-full flex justify-center items-center text-primary-500 dark:text-primary-600',
                      open
                        ? 'bg-primary-50 dark:bg-primary-200 dark:bg-opacity-15'
                        : 'bg-transparent'
                    )}
                  >
                    <Icon
                      as={ChevronUpIcon}
                      label="chevron-up"
                      className={cx(
                        'w-4 h-4',
                        open ? 'transform rotate-180' : ''
                      )}
                    />
                  </span>
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-muted text-left">
                  The page you wanted to refer to does not exist 😔...
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
      </InfoBox>
    </Layout>
  )
}

export default _404Page
