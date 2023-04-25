import Link from 'next/link';

export function HowMuchLink() {

  return (
    <Link href='https://how-much.xyz'>
      <button className='link-wrapper group group-hover:from-orange-500 group-hover:to-cyan-500'>
        <a className='group-hover:bg-opacity-0 font-cursive'
           target='_blank'
           title='Add operations to your shopping cart to start estimating your operation workflow'>
          <span className='m-0.5'>How much</span>
          <span className='text-orange-500'>?</span>
          <span className='text-cyan-500 rotate-[11deg] inline-block'>?</span>
          <span className='text-fuchsia-500 rotate-[22deg] inline-block'>!</span>
        </a>
      </button>
    </Link>
  );
}
