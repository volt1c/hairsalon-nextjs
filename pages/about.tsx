import { NextPage } from 'next'
import MainLayout from '@layouts/MainLayout'
import InfoBox from '@components/InfoBox'
import React from 'react'
import { Tab } from '@headlessui/react'
import { cx } from '@vechaiui/react'

const AboutPage: NextPage = () => {
  const tabs = [
    {
      value: 'inspirations',
      name: 'Inspirations ',
      content: <></>,
    },
    {
      value: 'members',
      name: 'Members',
      content: <></>,
    },
    {
      value: 'owners',
      name: 'Owners',
      content: <></>,
    },
  ]

  return (
    <MainLayout>
      <InfoBox className="p-0 border-primary-400 mx-24 my-auto">
        <Tab.Group as="div" className="flex flex-col" defaultIndex={0}>
          <Tab.List
            aria-label="tabs example"
            className={cx(
              'flex flex-row justify-start',
              'border-b border-neutral-200 dark:border-neutral-700'
            )}
          >
            {tabs.map((tab) => (
              <Tab
                key={tab.value}
                value={tab.value}
                className={cx(
                  'px-4 h-10 py-2 -mb-px text-sm text-center whitespace-nowrap cursor-base focus:outline-none',
                  'text-neutral-900 bg-transparent border-b-2 border-transparent',
                  'hover:border-neutral-300',
                  'selected:border-primary-500 selected:text-primary-600',
                  'dark:text-neutral-100',
                  'dark:hover:border-neutral-600',
                  'dark:selected:border-primary-500'
                )}
              >
                {tab.name}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels>
            {tabs.map((tab) => (
              <Tab.Panel key={tab.value} className="p-4 flex-grow-1">
                {tab.content}
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </InfoBox>
    </MainLayout>
  )
}

export default AboutPage
