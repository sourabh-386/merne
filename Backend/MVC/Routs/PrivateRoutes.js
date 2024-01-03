const express = require('express')
const PrivateRoute = express.Router()

const { save_personal } = require('../Controllers/User_data/Personal.js')
const { save_job, delete_job } = require('../Controllers/User_data/Job.js')
const { save_project, delete_project } = require('../Controllers/User_data/Project.js')
const { save_education, delete_education } = require('../Controllers/User_data/Education.js')
const { save_skill } = require('../Controllers/User_data/Skill.js')
const { save_links } = require('../Controllers/User_data/Portfolio.js')
const { Resume_uploader } = require('../Controllers/User_data/Resume.js')
const { Profile_img_uploader } = require('../Controllers/User_data/Profile_img.js')
const { UsergenralInfo, EmpDetaillInfo } = require('../Controllers/PrivateController.js')
const { save_tranning, delete_tranning } = require('../Controllers/User_data/Tranning.js')
const { upload } = require('../../Config/ConfigStorage.js')

PrivateRoute
  .post('/usergenralInfo', UsergenralInfo)

  .post('/personaldetail', save_personal)

  .post('/jobdetail', save_job)
  .delete('/deletejobdetail/:id', delete_job)

  .post('/projectdetail', save_project)
  .delete('/deleteprojectdetail/:id', delete_project)

  .post('/Tranningdetail', save_tranning)
  .delete('/deleteTranningdetail/:id', delete_tranning)

  .post('/educationdetail', save_education)
  .delete('/deleteeducationdetail/:id', delete_education)

  .post('/skilldetail', save_skill)

  .post('/Portfoliodetail', save_links)

  .post('/userdetail', EmpDetaillInfo)

  .post('/uploadResume', Resume_uploader)

  .post('/uploadUserimg', Profile_img_uploader)



// .post('/userdetail', upload, EmpDetaillInfo)


module.exports = PrivateRoute