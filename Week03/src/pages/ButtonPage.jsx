import {GoBell, GoTrash} from 'react-icons/go'
import Button from '../components/Button'

const ButtonPage = () => {
  return (
    <>
      <h1 className="text-3xl mb-4">Button Page!</h1>
      <div className="mb-3">
        <Button primary onClick={() => console.log('Primary clicked!')}>
          <GoBell />
          Primary
        </Button>
      </div>
      <div className="mb-3">
        <Button secondary className="mt-8">
          Secondary
        </Button>
      </div>
      <div className="mb-3">
        <Button success>Success</Button>
      </div>
      <div className="mb-3">
        <Button danger>Danger</Button>
      </div>
      <div className="mb-3">
        <Button warning>Warning</Button>
      </div>
      <div className="mb-3">
        <Button danger outline>
          <GoTrash />
          Danger Outline
        </Button>
      </div>
      <div className="mb-3">
        <Button success rounded>
          Success Rounded
        </Button>
      </div>
      <div className="mb-3">
        <Button primary outline rounded>
          Primary Outline Rounded
        </Button>
      </div>
      <div className="mb-3">
        <Button secondary rounded>
          Secondary Rounded
        </Button>
      </div>

      {/* homework for class A */}
      <div className="mb-3">
        <Button primary small>
          Primary Small
        </Button>
      </div>
      <div className="mb-3">
        <Button primary large>
          Primary Large
        </Button>
      </div>
      <div className="mb-3">
        <Button success outline rounded small>
          Success Outline Rounded Small
        </Button>
      </div>
      <div className="mb-3">
        <Button danger rounded large>
          Danger Rounded Large
        </Button>
      </div>
    </>
  )
}

export default ButtonPage
