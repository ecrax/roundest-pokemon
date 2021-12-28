import { GetServerSideProps, NextPage } from 'next';

const Results: NextPage<{}> = () => {
    return (
        <div>
            {

            }
        </div>
    );
}


export const getServerSideProps:GetServerSideProps = async (ctx) => {


    return {
        props:{
            data:null
        }
    }
}

export default Results;