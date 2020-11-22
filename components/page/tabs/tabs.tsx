import styles from './tabs.module.scss'
import classNames from 'classnames'
import React, { forwardRef, ReactElement, useEffect, useRef } from 'react'

type TabsProps = {
  children?: React.ReactElement<TabProps>[] | React.ReactElement<TabProps>
  model?: string
  onChange?: (name: string) => void
  dark?: boolean
}

type TabProps = {
  children?: React.ReactElement | React.ReactElement[] | string
  isActive?: boolean
  name: string
  onChange?: (name: string) => void
  dark?: boolean
}

type TabItemsProps = {
  children?: React.ReactElement<TabItemProps>[] | React.ReactElement<TabItemProps>
  model?: string
}

type TabItemProps = {
  children?: React.ReactElement | React.ReactElement[] | string
  name: string
}

export const Tabs: React.FunctionComponent<TabsProps> = (props: TabsProps) => {
  const sliderRef = useRef<HTMLDivElement>(null)
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const tabs: ReactElement<TabProps>[] | undefined = Array.isArray(props.children)
    ? props.children?.map((tab, i) => {
        return (
          <Tab
            {...tab.props}
            isActive={tab.props.name === props.model}
            onChange={props.onChange}
            key={i}
            ref={(el) => (tabRefs.current[i] = el)}
            dark={props.dark}
          >
            {tab.props.children}
          </Tab>
        )
      })
    : props.children
    ? [
        <Tab
          {...props.children.props}
          isActive={props.children?.props.name === props.model}
          onChange={props.onChange}
          key={0}
          ref={(el) => (tabRefs.current[0] = el)}
          dark={props.dark}
        >
          {props.children.props.children}
        </Tab>,
      ]
    : undefined
  const activeTab = tabs?.find((tab) => tab.props.name === props.model)

  useEffect(() => {
    if (activeTab && sliderRef.current) {
      const index = activeTab.key as number
      sliderRef.current.style.width = `${tabRefs.current[index]?.offsetWidth}px`
      sliderRef.current.style.left = `${tabRefs.current[index]?.offsetLeft}px`
    }
  }, [sliderRef, activeTab])

  return (
    <div className={classNames([styles.tabs, { [styles['tabs--dark']]: props.dark }])}>
      <div ref={sliderRef} className={styles.slider}></div>
      {tabs}
    </div>
  )
}

export const Tab = forwardRef<HTMLButtonElement, TabProps>((props: TabProps, ref) => {
  return (
    <button
      className={classNames([
        styles.tab,
        { [styles['tab--is-active']]: props.isActive },
        { [styles['tab--dark']]: props.dark },
      ])}
      onClick={() => {
        console.log('on click hanlder!')
        if (props.onChange) {
          props.onChange(props.name)
        }
      }}
      ref={ref}
      tabIndex={0}
      role="tab"
    >
      {props.children}
    </button>
  )
})

Tab.displayName = 'Tab'

export const TabItems: React.FunctionComponent<TabItemsProps> = (props: TabItemsProps) => {
  let activeTabItem

  if (Array.isArray(props.children)) {
    activeTabItem = props.children.find((tabItem) => tabItem.props.name === props.model)
  } else if (props.children?.props.name === props.model) {
    activeTabItem = props.children
  }

  return <div className={styles['tab-items']}>{activeTabItem}</div>
}

export const TabItem: React.FunctionComponent<TabItemProps> = (props: TabItemProps) => {
  return <div className={styles['tab-item']}>{props.children}</div>
}
