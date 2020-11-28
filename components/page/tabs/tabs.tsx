import classNames from 'classnames'
import React, { forwardRef, ReactElement, useEffect, useRef } from 'react'
import styles from './tabs.module.scss'

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
  isActive?: boolean
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
  }, [sliderRef, tabRefs, activeTab])

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
  let output: ReactElement<TabItemProps>[] | undefined = undefined
  const tabItemsRef = useRef<HTMLDivElement>(null)
  const oldModel = useRef<string | undefined>()
  const timeoutId = useRef<ReturnType<typeof setTimeout>>()

  if (timeoutId.current) {
    clearTimeout(timeoutId.current)
  }

  if (Array.isArray(props.children)) {
    output = props.children.map((child, i) => {
      return (
        <TabItem {...child.props} key={i} isActive={child.props.name === props.model}>
          {child.props.children}
        </TabItem>
      )
    })
  } else if (props.children) {
    output = [
      <TabItem {...props.children.props} key={0} isActive={props.children.props.name === props.model}>
        {props.children.props.children}
      </TabItem>,
    ]
  }

  useEffect(() => {
    if (tabItemsRef.current) {
      let oldActiveElementIndex: number | undefined
      let activeElementIndex: number | undefined

      const tabItems = tabItemsRef.current.querySelectorAll(`.${styles['tab-item']}`)

      for (const [i, item] of tabItems.entries()) {
        const tabItem = item as HTMLDivElement

        if (tabItem.dataset.name === oldModel.current) {
          tabItem.style.display = 'block'
          oldActiveElementIndex = i
        } else if (tabItem.dataset.name === props.model) {
          tabItem.style.display = 'block'
          activeElementIndex = i
        } else {
          tabItem.style.display = 'none'
        }
      }

      const activeElement = tabItemsRef.current.querySelector(`[data-name="${props.model}"]`) as HTMLDivElement
      const oldActiveElement = tabItemsRef.current.querySelector(`[data-name="${oldModel.current}"]`) as HTMLDivElement

      if (oldActiveElementIndex !== undefined && activeElementIndex !== undefined) {
        if (activeElementIndex > oldActiveElementIndex) {
          activeElement.style.left = '100%'
        } else {
          activeElement.style.left = '-100%'
        }
      }

      tabItemsRef.current.style.height = `${activeElement?.offsetHeight}px`

      requestAnimationFrame(() => {
        if (tabItemsRef.current) {
          if (oldActiveElement) {
            if (activeElement.style.left === '100%') {
              oldActiveElement.style.left = '-100%'
            } else {
              oldActiveElement.style.left = '100%'
            }
            activeElement.style.left = '0'

            timeoutId.current = setTimeout(() => {
              oldActiveElement.style.display = 'none'
            }, 300)
          }
        }
      })
    }

    if (oldModel.current !== props.model) {
      oldModel.current = props.model
    }
  }, [props.model, tabItemsRef])

  return (
    <div className={styles['tab-items']} ref={tabItemsRef}>
      {output}
    </div>
  )
}

export const TabItem: React.FunctionComponent<TabItemProps> = (props: TabItemProps) => {
  return (
    <div className={styles['tab-item']} data-name={props.name} data-active={props.isActive}>
      {props.children}
    </div>
  )
}
