import {Component} from 'react'
import {v4} from 'uuid'
import Header from '../Header'
import SlideItem from '../SlideItem'

import './index.css'

const initialSlidesList = [
  {
    id: 'cc6e1752-a063-11ec-b909-0242ac120002',
    heading: 'Welcome',
    description: 'Rahul',
  },
  {
    id: 'cc6e1aae-a063-11ec-b909-0242ac120002',
    heading: 'Agenda',
    description: 'Technologies in focus',
  },
  {
    id: 'cc6e1e78-a063-11ec-b909-0242ac120002',
    heading: 'Cyber Security',
    description: 'Ethical Hacking',
  },
  {
    id: 'cc6e1fc2-a063-11ec-b909-0242ac120002',
    heading: 'IoT',
    description: 'Wireless Technologies',
  },
  {
    id: 'cc6e20f8-a063-11ec-b909-0242ac120002',
    heading: 'AI-ML',
    description: 'Cutting-Edge Technology',
  },
  {
    id: 'cc6e2224-a063-11ec-b909-0242ac120002',
    heading: 'Blockchain',
    description: 'Emerging Technology',
  },
  {
    id: 'cc6e233c-a063-11ec-b909-0242ac120002',
    heading: 'XR Technologies',
    description: 'AR/VR Technologies',
  },
]

export default class NxtSlides extends Component {
  state = {
    slidesList: initialSlidesList,
    activeTabId: initialSlidesList[0].id,
    headingTag: true,
    paraTag: true,
    activeSlideHeading: initialSlidesList[0].heading,
    activeSlidePara: initialSlidesList[0].description,
  }

  onAddNew = () => {
    const {activeTabId, slidesList} = this.state
    const activeIndex = slidesList.findIndex(obj => obj.id === activeTabId)
    const insertIndex = activeIndex + 1
    const newSlide = {
      id: v4(),
      heading: 'Heading',
      description: 'Description',
    }
    const newArray = slidesList
    newArray.splice(insertIndex, 0, newSlide)
    this.setState({
      slidesList: newArray,
      activeSlideHeading: newSlide.heading,
      activeSlidePara: newSlide.description,
      activeTabId: newSlide.id,
    })
  }

  onClickSlide = details => {
    this.setState({
      activeTabId: details.id,
      activeSlideHeading: details.heading,
      activeSlidePara: details.description,
    })
  }

  onConvertHeadingTag = () => {
    this.setState(prevState => ({headingTag: !prevState.headingTag}))
  }

  onConvertParaTag = () => {
    this.setState(prevState => ({paraTag: !prevState.paraTag}))
  }

  onChangeSmallSlideHeading = () => {
    const {activeSlideHeading, activeTabId} = this.state

    this.setState(prevState => ({
      slidesList: prevState.slidesList.map(each => {
        if (each.id === activeTabId) {
          return {...each, heading: activeSlideHeading}
        }
        return each
      }),
    }))
  }

  onChangeSmallSlidePara = () => {
    const {activeSlidePara, activeTabId} = this.state

    this.setState(prevState => ({
      slidesList: prevState.slidesList.map(each => {
        if (each.id === activeTabId) {
          return {...each, description: activeSlidePara}
        }
        return each
      }),
    }))
  }

  onChangeHeading = event => {
    this.setState(
      {activeSlideHeading: event.target.value},
      this.onChangeSmallSlideHeading,
    )
  }

  onBlurHeading = () => {
    const {activeSlideHeading, activeTabId} = this.state

    if (activeSlideHeading === '') {
      this.setState(prevState => ({
        activeSlideHeading: 'Heading',
        slidesList: prevState.slidesList.map(each => {
          if (each.id === activeTabId) {
            return {...each, heading: 'Heading'}
          }
          return each
        }),
      }))
    }

    this.setState(prevState => ({
      headingTag: !prevState.headingTag,
    }))
  }

  onBlurPara = () => {
    const {activeSlidePara, activeTabId} = this.state
    if (activeSlidePara === '') {
      this.setState(prevState => ({
        activeSlidePara: 'Description',
        slidesList: prevState.slidesList.map(each => {
          if (each.id === activeTabId) {
            return {...each, description: 'Description'}
          }
          return each
        }),
      }))
    }

    this.setState(prevState => ({
      paraTag: !prevState.paraTag,
    }))
  }

  onChangePara = event => {
    this.setState(
      {activeSlidePara: event.target.value},
      this.onChangeSmallSlidePara,
    )
  }

  render() {
    const {
      activeTabId,
      slidesList,
      headingTag,
      paraTag,
      activeSlideHeading,
      activeSlidePara,
    } = this.state

    let slideNo = 0

    return (
      <>
        <Header />
        <div className="app-container">
          <button type="button" onClick={this.onAddNew} className="new-button">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-slides/nxt-slides-plus-icon.png"
              alt="new plus icon"
              className="plus-icon"
            />
            New
          </button>
          <div className="slides-slide-container">
            <ol className="slides-ol-container">
              {slidesList.map(each => {
                slideNo += 1
                return (
                  <SlideItem
                    key={each.id}
                    onClickSlide={this.onClickSlide}
                    slideDetails={each}
                    slideNo={slideNo}
                    isActive={activeTabId === each.id}
                  />
                )
              })}
            </ol>
            <div className="main-slide-container">
              {headingTag ? (
                <h1
                  className="current-slide-heading"
                  onClick={this.onConvertHeadingTag}
                >
                  {activeSlideHeading}
                </h1>
              ) : (
                <input
                  className="input-text1"
                  onChange={this.onChangeHeading}
                  onBlur={this.onBlurHeading}
                  value={activeSlideHeading}
                  type="text"
                />
              )}
              {paraTag ? (
                <p
                  onClick={this.onConvertParaTag}
                  className="current-slide-para"
                >
                  {activeSlidePara}
                </p>
              ) : (
                <input
                  className="input-text2"
                  onChange={this.onChangePara}
                  onBlur={this.onBlurPara}
                  value={activeSlidePara}
                  type="text"
                />
              )}
            </div>
          </div>
        </div>
      </>
    )
  }
}
