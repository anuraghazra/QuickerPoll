import React from 'react'
import { Card, Icon } from 'antd';

const data = [
  {
    title: "React",
    url: 'https://reactjs.org',
    summery: 'React is a JavaScript library that aims to simplify development of visual interfaces.'
  },
  {
    title: "Ant Design",
    url: 'https://ant.design',
    summery: 'A design system with values of Nature and Determinacy for better user experience of enterprise applications'
  },
  {
    title: "Express",
    url: 'https://expressjs.com/',
    summery: 'Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.'
  },
  {
    title: "Axios",
    url: 'https://github.com/axios/axios',
    summery: 'Promise based HTTP client for the browser and node.js.'
  },
  {
    title: "Mongoosejs",
    url: 'https://mongoosejs.com/',
    summery: 'Mongoose provides a straight-forward, schema-based solution to model your application data.'
  },
  {
    title: "mLab",
    url: 'https://mlab.com/',
    summery: 'Database-as-a-Service for MongoDB. Now part of the MongoDB family, powering over 1 million deployments worldwide.'
  },
]

function ToolsUsed() {
  return (
    <section className="tools-used">
      {data.map((item, i) => {
        return (
          <Card
            key={i}
            title={item.title}
            extra={<a rel="noopener noreferrer" target="_blank" href={item.url} ><Icon type="login" /></a>}
          >
            <p>{item.summery}</p>
          </Card>
        )
      })}
    </section>
  )
}


export default ToolsUsed;