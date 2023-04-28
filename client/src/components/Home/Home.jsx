import { useEffect, useState, useRef, useMemo } from "react";
import ImageComponent from "./images/ImageComponent"
import { Link } from "react-router-dom"
import SelectCategory from "./SelectCategory/SelectCategory";
import { useDispatch, useSelector } from "react-redux";
import { downloudData, editFatching } from "../../reducers/data/dataSlice";
import { downloudCategoryGet, downloudCategoryPost } from "../../reducers/category/categorySlice";
import { ModalContent } from "./modal/Modal";
import "./css/home.scss"
import { DotSpinner } from '@uiball/loaders'
import UploadAvatar from "./UploadAvatar/UploadAvatar";
import Modal from 'react-modal';
import { RemoveScroll } from "react-remove-scroll";




function Home() {
    const fatchDataRedux = useSelector((state) => state.downlodeData.fatching);
    const nowData = useSelector((state) => state.downlodeData.data);
    const requsetCategoryRedux = useSelector(state => state.categorySearch.category);
    const fetchingCategory = true;
    const [selectValue, setSelectValue] = useState("All")
    const [nesting, setNesting] = useState(0);
    const dispatch = useDispatch();
    const modalData = useSelector((state) => state.modal);
    const offset = useRef(0);
    const loaderRef = useRef(null);
    const [modalIsOpen, setIsOpen] = useState(false);
    useEffect(() => {
        if (fatchDataRedux) {
            dispatch(downloudData(nowData, offset.current, editFatching({ fatching: false })));
            offset.current++
        }
    }, [fatchDataRedux]);

    // requset category
    useEffect(() => {

        // requset category first 
        if (fetchingCategory && nesting <= 0) {
            dispatch(downloudCategoryGet());
        }
        // requset category in  category
        if (nesting > 0) {
            dispatch(downloudCategoryPost(requsetCategoryRedux, selectValue));
        }
    }, [nesting, fetchingCategory]);

    const handle_observer = entries => {
        const target = entries[0];
        if (target.isIntersecting) {
            return dispatch(editFatching({ fatching: true }));
        }
    };

    // function scroll event 
    useEffect(() => {
        const options = {
            root: null,
            rootMargin: "20px",
            threshold: 1.0
        };

        const observer = new IntersectionObserver(handle_observer, options);
        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        // Remove the observer when the component unmounts
        return () => {
            if (loaderRef.current) {
                dispatch(editFatching({ fatching: true }));
            }
        };
    }, []);
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    const openModal = () => {
        setIsOpen(true);
    }
    const closeModal = () => {
        setIsOpen(false);
    }
    Modal.setAppElement("#root");
    return (
        <div className="home">
            <h1 className="text-center mt-5">
                Recommended pictures {selectValue === "All" ? "" : `search category: "${selectValue}"`}
            </h1>
            <div className="add_container">
                <button className="go_add_image" onClick={openModal}>Create Avatar</button>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}

            >
                <RemoveScroll>
                    <UploadAvatar />
                </RemoveScroll>

            </Modal>

            {modalData.modalData.modal && (
                <ModalContent>
                    <div className="modal_center">
                        <img className="img-fluid" src={modalData.modalData.modalImg} alt="" />
                    </div>
                </ModalContent>
            )}
            <div className="add_container">
                {/* route for adding pictures */}
                <Link className="go_add_image" to={"/add_image"}>
                    Add Image
                </Link>
            </div>
            {/* category for pictures */}
            {

                requsetCategoryRedux?.map((elem, index) => {
                    return <SelectCategory props={{ elem, setSelectValue, setNesting }} key={index} />
                })

            }
            <div style={
                {
                    textAlign: "center",
                    padding: "20px 0 0 0"
                }
            }>

            </div>
            <div className="row">
                {
                    // an array from the backend that is being rendered for component ImageComponent
                    useMemo(() => {
                        return nowData?.map((elem, index) => {
                            return <ImageComponent
                                props={elem}
                                key={Math.random() * 100}
                            />
                        })
                    }, [nowData])
                }
            </div>
            <div className="d-flex justify-content-center" style={{ height: "200px" }} ref={loaderRef}>
                <DotSpinner
                    size={60}
                    speed={1.75}
                    color="#385898"
                    lineWeight={3.5}
                />
            </div>
        </div>
    );

}
export default Home;