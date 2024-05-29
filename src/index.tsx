import { Column, Columns, Row, Rows, vars } from "./ui.js";
import { Button, Frog } from 'frog'
import { devtools } from 'frog/dev'
import { serveStatic } from 'frog/serve-static'

// import { neynar } from 'frog/hubs'

export const app = new Frog({
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' }),
  ui: {vars},
  imageOptions: {width: 1000, height: 1000},
  imageAspectRatio: '1:1'
})

app.frame('/', (c) => {
return c.res({
    image: (
      <Rows gap="4" width="100%" height="100%">
        {[...Array(4)].map((_, rowIndex) => (
          <Row backgroundColor="red" height="1/4" width="100%">
            <Columns
              gap="1"
              width="100%"
              height="100%"
              alignHorizontal="center"
              alignVertical="center"
            >
              {[...Array(4)].map((_, colIndex) => (
                <Column backgroundColor="gray" width="1/4">
                  {colIndex + 1 + rowIndex * 4}
                </Column>
              ))}
            </Columns>
          </Row>
        ))}
      </Rows>
    ),
    intents: [
      <Button.Link href="https://www.example.com/">Link </Button.Link>,
      <Button value="learn" action="/example">
        Button Press
      </Button>,
    ],
  });
})

app.use('/*', serveStatic({ root: './public' }))
devtools(app, { serveStatic })

if (typeof Bun !== 'undefined') {
  Bun.serve({
    fetch: app.fetch,
    port: 3000,
  })
  console.log('Server is running on port 3000')
}
