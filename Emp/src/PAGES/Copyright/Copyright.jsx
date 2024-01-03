// CopyrightPage.jsx

import React from 'react';
import style from './Copyright.module.css'
import Footer from '../../CONTAINER/Footer/Footer';
const CopyrightPage = () => {
    const currentYear = new Date().getFullYear();

    return (
        <>
            <div className={style.copyright_page}>
                <h2>www.freelancebharat.com Copyright © {currentYear}</h2>
                <br />
                <div>
                    <h2 className={style.h2}>Ownership of Content:</h2>
                    <p className={style.p}>
                        Unless otherwise stated, all text, images, and other content on www.freelancebharat.com are the property of EGISEDGE TECHNOLOGIES PRIVATE LIMITED.
                        They are protected by international copyright laws and may not be reproduced, distributed, transmitted, displayed, published, or broadcast without the prior written permission of EGISEDGE TECHNOLOGIES PRIVATE LIMITED.
                    </p>
                </div>

                <div>
                    <h3 className={style.h3}>Permissions:</h3>
                    <p className={style.p}>
                        If you would like to use any content from www.freelancebharat.com, please contact EGISEDGE TECHNOLOGIES PRIVATE LIMITED for permission.
                        Permission may be granted on a case-by-case basis.
                    </p>
                </div>

                <div>
                    <h3 className={style.h3}>Third-Party Content:</h3>
                    <p className={style.p}>
                        Some content on www.freelancebharat.com may be sourced from third parties, and appropriate credits are provided where applicable.
                        Such third-party content is subject to the copyright terms and conditions of the respective owners.
                    </p>
                </div>

                <div>
                    <h3 className={style.h3}>Trademarks:</h3>
                    <p className={style.p}>
                        All trademarks, service marks, and trade names used on www.freelancebharat.com are the property of EGISEDGE TECHNOLOGIES PRIVATE LIMITED, and any unauthorized use is prohibited.
                    </p>
                </div>

                <div>
                    <h3 className={style.h3}>Disclaimer:</h3>
                    <p className={style.p}>
                        www.freelancebharat.com is provided "as is" without any representations or warranties, express or implied.
                        EGISEDGE TECHNOLOGIES PRIVATE LIMITED makes no representations or warranties in relation to www.freelancebharat.com or the information and materials provided on the website.
                    </p>
                </div>

                <div>
                    <h3 className={style.h3}>Updates and Changes:</h3>
                    <p className={style.p}>
                        EGISEDGE TECHNOLOGIES PRIVATE LIMITED reserves the right to modify or revise the content and policies of www.freelancebharat.com at any time without prior notice.
                    </p>
                </div>

                <div>
                    <h3 className={style.h3}>Contact Information:</h3>
                    <p className={style.p}>
                        If you have any questions regarding the copyright or use of the content on www.freelancebharat.com, please contact EGISEDGE TECHNOLOGIES PRIVATE LIMITED at <a href="mailto:egisedge123@gmail.com" className={style.a}>egisedge123@gmail.com</a>.
                    </p>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default CopyrightPage;
