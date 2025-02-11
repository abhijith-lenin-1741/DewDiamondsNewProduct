import { useNavigate } from "react-router";

const Loading = (props) => {

    return(
        <>
            <div class="px-3 py-5 text-primary text-center">
                <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
        </>
    )
};

export default Loading;
