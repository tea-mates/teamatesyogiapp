const imgScraperLister = require("./utilities/imgScraperUtil");
const deleteBadImgData = require("./utilities/deleteBadImgData");

const mountainPoseSamples =
  "https://www.yogajournal.com/.image/t_share/MTQ3MTUyNzM1MjQ1MzEzNDg2/mountainhp2_292_37362_cmyk.jpg<br>https://www.gaia.com/wp-content/uploads/Header-mountain_pose-750x441-735x432.jpg<br>https://images.cdn-outlet.com/yo-userfiles/image/Yoga_MountainPose_300x350.jpg<br>http://www.yogabasics.com/yogabasics2017/wp-content/uploads/2013/11/Tadasana_2270.jpg<br>https://yogabykarina.com/wp-content/uploads/2017/10/How-to-Do-Mountain-Pose-Yoga-Instructions-B-min.jpg<br>http://www.yogabasics.com/yogabasics2017/wp-content/uploads/2013/11/mountain_0613.jpg<br>http://www.theyogaposes.com/images/p/yoga-tadasana-pose.jpg<br>https://www.yogiapproved.com/wp-content/uploads/2015/02/tadasana-mountain-pose-featured.jpg<br>https://images-s3.yogainternational.com/assets/content/cache/made/assets/content/cache/remote/https_s3.amazonaws.com/images-s3.yogainternational.com/assets/content/articles/Mountain_Pose_800_450auto_int.jpg<br>https://www.verywellfit.com/thmb/SQAVeHUcdkniFvOeXmAXNTlj0Xw=/1500x1000/filters:no_upscale():max_bytes(150000):strip_icc()/mountainpose_annotations-5c536e35c9e77c0001cff299.jpg<br>https://i.ytimg.com/vi/-oClMRfmzKU/hqdefault.jpg<br>https://images.cdn-outlet.com/yo-images/guide/yoga/15511011182010025617.jpg<br>https://vinyasayogaacademy.com/blog/wp-content/uploads/2016/08/Mountain-Pose.jpg<br>https://nhncwtttsf-flywheel.netdna-ssl.com/34/wp-content/uploads/sites/59/2018/08/Tadasana-Mountain-Pose-Yoga-Steps-and-Benefits.jpg<br>https://vinyasayogatraining.com/wp-content/uploads/2014/10/tadasana-Mountain-Pose.jpg<br>https://2.bp.blogspot.com/-sJQER7VWv94/VztX_7do8UI/AAAAAAAAIOY/F-pxuhxLDAYTgZQrYuPwPurwBJc2i03dgCKgB/s1600/Mountain-Pose.jpg<br>http://2.bp.blogspot.com/_5UdEsCydnuw/TELM4JkNPeI/AAAAAAAAAZg/aOfpeMpKsdA/s1600/45.+UP+MOUNTAIN.jpg<br>http://akashayogaacademy.com/wp-content/gallery/new-asanas/21-Tadasana-Mountain-Pose-03.jpg<br>https://www.alphamale.co/wp-content/uploads/2017/12/tadasana-small-450x300.jpg<br>https://previews.123rf.com/images/rilueda/rilueda1606/rilueda160600517/59704339-yoga-mountain-pose-tadasana.jpg<br>https://i.pinimg.com/originals/76/1f/d3/761fd35376732ab205b71b415f36846a.jpg<br>https://www.yogauonline.com/sites/default/files/styles/wellness_blog_level3_main/public/article_images/tadasana-9_copy.jpg?itok=EqlqJHVZ<br>http://static1.squarespace.com/static/5777feb9197aead3b2890965/t/58710295ebbd1ae2e39f4e72/1483801375479/Your+10+Min+Total+Body,+Yoga+Workout_2.jpg?format=1500w<br>https://i0.wp.com/www.feelgoodyogavictoria.com/fgyp/wp-content/uploads/2014/12/tadasana-mountain-pose.png?resize=153,624<br>https://previews.123rf.com/images/comotomo/comotomo1612/comotomo161200092/69115663-women-silhouette-yoga-mountain-pose-tadasana-vector-illustration.jpg<br>http://www.enlightenyogaclt.com/wp-content/uploads/2014/07/F60C1497.jpg<br>https://static1.squarespace.com/static/53c723f0e4b057b2aaf90c0f/t/53ed7593e4b0b87c659902cd/1408071067570/tadasana-yoga-pose-jack-cuneo<br>https://i.ndtvimg.com/i/2016-06/yoga_625x350_41466146903.jpg<br>https://cdn.prod.openfit.com/uploads/2017/06/03121022/mountain-pose.jpg<br>https://c8.alamy.com/comp/XE9P02/female-standing-in-yoga-tadasana-mountain-pose-with-thumb-and-first-finger-together-and-eyes-closed-XE9P02.jpg<br>https://www.styleoga.it/wp-content/uploads/2017/11/tadasana-posizione-della-montagna.jpg<br>https://i.ytimg.com/vi/Bz1SWd-cihA/maxresdefault.jpg<br>https://www.yogajournal.com/.image/t_share/MTQ2MTgwODEyNjAyMTU2NDc3/watch-learn-mountain-pose.jpg<br>http://allyogapositions.com/wp-content/uploads/2018/10/mountain-pose-how-to-do-the-yoga-mountain-pose-tadasana_9.jpg<br>https://workouttrends.imgix.net/2014/03/Yoga-Poses-Tadasana-Mountain-Pose.jpg?auto=compress,format&amp;fit=crop&amp;h=1150&amp;ixlib=php-1.2.1&amp;w=1150&amp;wpsize=stylemag-single-featured-column&amp;s=501c94e66d2c8d331c8f32253098b659<br>https://eyogaguru.com/wp-content/uploads/2017/01/tadasana-yoga.jpg<br>https://www.flashmavi.com/med_old/gif/yoga_tadasana_the_mountain_pose.gif<br>https://7pranayama.com/wp-content/uploads/2018/10/Tadasana-Yoga-Mountain-Pose.jpg<br>https://americanyoga.school/wp-content/uploads/2015/11/2015-10-21-at-16-21-41-2-567x1024.jpg<br>https://www.yogajournal.com/.image/t_share/MTQ2MTgwNzE5OTg5ODI3MTA0/namaste-mountain-pose.jpg<br>https://yogatoyoustl.com/wp-content/uploads/2016/10/mountain.jpg<br>https://i.pinimg.com/originals/7a/ca/88/7aca88a2ab70c9eccfd351aa358c360e.jpg<br>https://s3.amazonaws.com/tummee/samasthiti_yoga.png<br>http://mindfullywritten.com/wp-content/uploads/2013/05/tadasana.jpeg.jpg<br>https://yogatherapyalacarte.files.wordpress.com/2014/05/01c2a9rgoellnitz_rm_mountainchair_web_img_0537.jpg<br>https://www.artofliving.org/sites/www.artofliving.org/files/wysiwyg_imageupload/Tadasan-compressor.png<br>https://14ljpk2ezaxb4dksqi3bz96r3-wpengine.netdna-ssl.com/wp-content/uploads/2017/07/Tadasana-pose-2-1.jpg<br>https://i.ytimg.com/vi/_gMvwXah5VI/maxresdefault.jpg<br>https://mkvyoga.com/wp-content/uploads/2018/01/tadasana-3-990x557.jpg<br>https://liforme.com/blog/wp-content/uploads/2018/04/Blog-Mountain-Pose.jpg<br>https://yogawithadriene.com/wp-content/uploads/2013/12/tadasana-mountain-pose.jpg<br>https://previews.123rf.com/images/comotomo/comotomo1702/comotomo170200064/72321515-women-silhouette-yoga-mountain-pose-tadasana-.jpg<br>https://i0.wp.com/suzlyfe.com/wp-content/uploads/2015/02/tadasana-suzlyfe-yoga-clinic.png?resize=300,300<br>https://3.bp.blogspot.com/-zOmmVU8PCI8/WIeI9gLxoYI/AAAAAAAAB2Q/F-B5mo2lWTUDZS8WXzUfBUhRf7ouXZChQCLcB/s1600/Tadasana.jpg<br>https://www.yogafreedom.co.uk/yf-admin/data/img/uploads/2125672739Fotolia_81324007_XS.jpg<br>https://s3.amazonaws.com/tummee/one_legged_mountain_pose__eka_pada_tadasana_yoga.png<br>https://upload.wikimedia.org/wikipedia/commons/f/f2/Tadasana_-_Yoga_Art_and_Science.jpg<br>https://inveronica.com/wp-content/uploads/2017/09/Tadasana-Mountain-Pose.jpg<br>https://i.ytimg.com/vi/vkqy8UABZes/maxresdefault.jpg<br>https://www.custompilatesandyoga.com/wp-content/uploads/2017/02/Tadasana-with-extension-e1535555612330.jpg<br>https://images.freeart.com/comp/art-print/fa51017905/woman-doing-hatha-yoga-asana-tadasana.jpg<br>http://www.foodadit.com/media/Eiizabeth-Smullens-Brass-Urdhva-Hastasana-in-Tadasana.jpg<br>https://s3.amazonaws.com/tummee/mountain_pose_twist_arms_shoulder_level_spread_out__tadasana_twist_arms_shoulder_level_spread_out_yoga.png<br>https://liveosumly.com/wp-content/uploads/2018/08/Tadasana.png<br>https://i.pinimg.com/originals/a1/4f/d5/a14fd5a33d7dbeb272e107274c0a3e8d.png<br>https://i.ytimg.com/vi/SrhYsbmeNes/maxresdefault.jpg<br>http://www.yogacurious.com/blog/wp-content/gallery/tadasana-mountain-pose.jpg<br>https://iymsrishikesh.org/wp-content/uploads/2017/02/Mountain-Pose.jpg<br>https://m.media-amazon.com/images/I/6105hZf2lVL._SS500_.jpg<br>https://chopra.com/sites/default/files/yoga-mountain-pose_0.jpg<br>http://www.msunites.com/wp-content/uploads/Tadasana-Easiest.jpg<br>https://schoolofyoga.in///wp-content/uploads/2016/12/4-Asana-18-tadasana-Anu.png<br>http://1.bp.blogspot.com/-xvs947zIOkU/UCELvIWQ_-I/AAAAAAAAACc/j6YBRxX2AmI/s1600/photo.JPG<br>https://s3.amazonaws.com/tummee/mountain_pose_chair_to_chair_pose_flow__tadasana_chair_to_utkatasana_vinyasa_yoga.png<br>http://www.oceanflowfitness.com/wp-content/uploads/2017/01/DSC00302-e1483799516423.jpg<br>https://static1.squarespace.com/static/5c105159b10598528045e378/t/5c1d871521c67c0d67b85028/1546036783497/Yoga+Engineer+|+Mountain+Pose<br>https://www.ayurhealthtips.com/wp-content/uploads/2018/08/Mountain-Pose.jpg<br>https://i.pinimg.com/originals/a0/bd/64/a0bd64f9365cb8eacb3ed9a020a08bfa.jpg<br>http://www.marthyfit.com/wp-content/uploads/2017/08/Tadasana2-6.jpg<br>http://www.yogabasics.com/yogabasics2017/wp-content/uploads/2017/09/imgp3565-1080x720.jpg<br>http://www.hyablog.com/wp-content/uploads/2015/02/Tadasana-086.jpg<br>https://www.ekhartyoga.com/img/cache/media_63548_widen_1000_100-Mountain Pose Tadasana.jpg<br>https://previews.123rf.com/images/ostill/ostill1701/ostill170100078/69377515-woman-yoga-exercices-tadasana-mountain-pose.jpg<br>https://s3.amazonaws.com/tummee/mountain_pose_on_tiptoes__tadasana_on_tiptoes_yoga.png<br>https://roamingyogi.co/wp-content/uploads/2017/03/Highlight-On...Tadasana.jpg<br>https://as2.ftcdn.net/jpg/01/64/25/07/500_F_164250737_qjinqmyGADckNdobN2VTSqgNU1Gj2c8i.jpg<br>https://s3.amazonaws.com/images-s3.yogainternational.com/assets/content/articles/tadasana.JPG<br>https://i.ytimg.com/vi/ZCszOlx0kSw/maxresdefault.jpg<br>https://simplegentleyoga.com/wp-content/uploads/2019/01/Mountain-Horizontal-1.png<br>https://i.pinimg.com/originals/4c/78/5b/4c785b987d20b67d59055e77d27f213e.jpg<br>https://c8.alamy.com/comp/X9NFYY/female-practicing-yoga-in-a-garden-female-standing-in-the-tadasana-mountain-pose-her-palms-facing-outwards-and-arms-slightly-X9NFYY.jpg<br>https://arogyayogaschool.com/blog/wp-content/uploads/2017/08/Mountain-Pose.jpg<br>https://a.optmnstr.com/users/dd9673235b32/images/f98dea7900061532539945-eNewsPopUp1.jpg<br>https://s3.amazonaws.com/tummee/mountain_pose_on_tiptoes_arms_flow__tadasana_on_tiptoes_hasta_vinyasa_yoga.png<br>http://static1.squarespace.com/static/560c142de4b0e4ad490cba8c/560c1ca0e4b0c2b900455083/58435b7e6a4963f159ae2343/1480811965965/AmandaMonzonYoga-PoseBreakdown-Tadasana.png?format=1500w<br>https://aboutyogablog.com/wp-content/uploads/2018/08/Yoga-Poses-Yoga-For-Beginners-Yoga-For-Height-Growth-Tadasana-Yoga-Mountain-Pose-Asana-For-Fitness-696x385.jpg<br>https://vinyasayogatraining.com/wp-content/uploads/2014/10/tadasana-Mountain-Pose-814x400.jpg<br>http://www.feelgoodyogavictoria.com/fgyp/wp-content/uploads/2014/12/tadasana-mountain-pose.png<br>https://dutchsmilingyogi.com/wp-content/uploads/2014/12/Dutch-Smiling-Yogi-in-Tadasana.jpg<br>http://yoga-can-do.com/wp-content/uploads/2016/12/mountain-pose-815291_640.jpg<br>";

let mountainPoseArrayOfUrls = imgScraperLister(mountainPoseSamples);

const idxToRemove = [
  2,
  9,
  10,
  11,
  12,
  16,
  17,
  18,
  19,
  21,
  23,
  27,
  30,
  31,
  35,
  38,
  39,
  41,
  44,
  45,
  46,
  48,
  49,
  50,
  52,
  53,
  55,
  60,
  62,
  65,
  68,
  70,
  71,
  72,
  73,
  76,
  81,
  83,
  84,
  86,
  91,
  92,
  93,
  96,
  97,
  98,
  100
];

const mountainPoseUrls = deleteBadImgData(idxToRemove, mountainPoseArrayOfUrls);

// export default mountainPoseArrayOfUrls;
export default mountainPoseUrls;