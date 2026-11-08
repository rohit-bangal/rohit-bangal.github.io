/* ==========================================================================
   ROHIT BANGAL — BESPOKE INTERACTION ENGINE (ZERO EXTERNAL BLOAT)
   ========================================================================== */
(function () {
  'use strict';

  // 1. Dual Theme Controller ("Dark Mode" / "Light Mode")
  var body = document.body;
  var themeBtn = document.getElementById('theme-toggle');
  var themeLabel = document.getElementById('theme-toggle-label');
  var themeIcon = document.getElementById('theme-toggle-icon');

  function setTheme(mode) {
    body.setAttribute('data-theme', mode);
    if (themeLabel && themeIcon) {
      if (mode === 'light') {
        themeLabel.textContent = 'Dark Mode';
        themeIcon.textContent = '☾';
      } else {
        themeLabel.textContent = 'Light Mode';
        themeIcon.textContent = '☀';
      }
    }
  }

  var storedTheme = null;
  try { storedTheme = localStorage.getItem('rb_portfolio_theme'); } catch (e) {}
  setTheme(storedTheme === 'light' ? 'light' : 'dark');

  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var next = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      setTheme(next);
      try { localStorage.setItem('rb_portfolio_theme', next); } catch (e) {}
    });
  }

  // 2. Live Mountain View, CA Local Clock (Marco.fyi touch)
  var clockEl = document.getElementById('bay-area-clock');
  function updateClock() {
    if (!clockEl) return;
    try {
      var now = new Date();
      var formatted = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/Los_Angeles',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
      }).format(now);
      clockEl.textContent = formatted;
    } catch (e) {
      clockEl.textContent = 'Silicon Valley, CA';
    }
  }
  updateClock();
  setInterval(updateClock, 15000);

  // 3. Copy Email Micro-Interaction
  document.querySelectorAll('[data-copy-email]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var email = btn.getAttribute('data-copy-email');
      var customCopied = btn.getAttribute('data-copied-label');
      var labelSpan = btn.querySelector('.copy-label') || btn;
      var original = labelSpan.textContent;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(function () {
          labelSpan.textContent = customCopied || 'Copied rohitbangal.rb@gmail.com ✓';
          setTimeout(function () { labelSpan.textContent = original; }, 2200);
        });
      } else {
        window.location.href = 'mailto:' + email;
      }
    });
  });

  // 4. Bento Card Specular Spotlight Tracking
  document.querySelectorAll('.bento-card').forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - rect.left) + 'px');
      card.style.setProperty('--my', (e.clientY - rect.top) + 'px');
    }, { passive: true });
  });

  // 5. Interactive Bento Hardware Stack Switcher
  var stackTabs = document.querySelectorAll('.stack-tab[data-stack]');
  var stackPanels = document.querySelectorAll('.stack-panel[data-stack-panel]');
  stackTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var key = tab.getAttribute('data-stack');
      stackTabs.forEach(function (t) { t.classList.remove('active'); });
      stackPanels.forEach(function (p) {
        p.classList.toggle('active', p.getAttribute('data-stack-panel') === key);
      });
      tab.classList.add('active');
    });
  });

  // 6. Interactive Flagship Hardware Block Diagram Nodes
  document.querySelectorAll('[data-arch-group]').forEach(function (stage) {
    var nodes = stage.querySelectorAll('.arch-node[data-note]');
    var inspectorTag = stage.querySelector('.arch-inspector-tag');
    var inspectorText = stage.querySelector('.arch-inspector-text');
    nodes.forEach(function (node) {
      node.addEventListener('click', function () {
        nodes.forEach(function (n) { n.classList.remove('active'); });
        node.classList.add('active');
        if (inspectorTag) inspectorTag.textContent = node.getAttribute('data-tag') || 'STAGE';
        if (inspectorText) inspectorText.textContent = node.getAttribute('data-note') || '';
      });
    });
  });

  // 7. Project Category Filter Pills
  var archiveBtns = document.querySelectorAll('.archive-pill[data-archive-filter]');
  var filterableItems = document.querySelectorAll('.project-tile[data-cat], .archive-row-grid[data-cat]');
  archiveBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var cat = btn.getAttribute('data-archive-filter');
      archiveBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      filterableItems.forEach(function (item) {
        var rowCats = (item.getAttribute('data-cat') || '').split(/\s+/);
        if (cat === 'all' || rowCats.indexOf(cat) !== -1) {
          item.classList.remove('hidden-item');
        } else {
          item.classList.add('hidden-item');
        }
      });
    });
  });

  // 8. Scroll Progress Bar, Mobile Dropdown & Floating Dock Scroll-Spy
  var progressBar = document.getElementById('scroll-progress');
  var dockNav = document.getElementById('dock-nav');
  var mobileTrigger = document.getElementById('dock-mobile-trigger');
  var mobileCurrentLabel = document.getElementById('dock-mobile-current');
  var dockLinks = document.querySelectorAll('.dock-link[href^="#"]');
  var trackedSections = [];
  dockLinks.forEach(function (link) {
    var sec = document.querySelector(link.getAttribute('href'));
    if (sec) trackedSections.push({ id: sec.id, el: sec, link: link });
  });

  function setMobileMenu(open) {
    if (!dockNav || !mobileTrigger) return;
    if (open) {
      dockNav.classList.add('menu-open');
      mobileTrigger.setAttribute('aria-expanded', 'true');
    } else {
      dockNav.classList.remove('menu-open');
      mobileTrigger.setAttribute('aria-expanded', 'false');
    }
  }

  if (mobileTrigger) {
    mobileTrigger.addEventListener('click', function (e) {
      e.stopPropagation();
      setMobileMenu(!dockNav.classList.contains('menu-open'));
    });
  }

  dockLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (mobileCurrentLabel) mobileCurrentLabel.textContent = link.textContent;
      setMobileMenu(false);
    });
  });

  var monogramLink = document.querySelector('.dock-monogram');
  if (monogramLink) {
    monogramLink.addEventListener('click', function () {
      setMobileMenu(false);
    });
  }

  document.addEventListener('click', function (e) {
    if (dockNav && dockNav.classList.contains('menu-open') && !dockNav.contains(e.target)) {
      setMobileMenu(false);
    }
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 760) setMobileMenu(false);
  });

  function onScroll() {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    var docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (progressBar) {
      progressBar.style.width = (docHeight > 0 ? (scrollTop / docHeight) * 100 : 0) + '%';
    }
    var probe = scrollTop + 180;
    var activeItem = trackedSections[0];
    for (var i = 0; i < trackedSections.length; i++) {
      if (trackedSections[i].el.offsetTop <= probe) {
        activeItem = trackedSections[i];
      }
    }
    if (activeItem) {
      dockLinks.forEach(function (l) { l.classList.remove('active'); });
      activeItem.link.classList.add('active');
      if (mobileCurrentLabel) {
        mobileCurrentLabel.textContent = activeItem.link.textContent;
      }
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // 9. Bespoke Noir Lightbox (Single Image, Multi-Slide Decks & HTML5 Video)
  var GALLERIES = {
    battery_tester: [
      { src: 'img/battery_tester/pcb_rev3.jpg?v=2', title: 'Smart Battery Module Tester — Custom Rev 3 PCB', caption: 'Custom mixed-signal diagnostic PCB integrating a TI multi-cell battery monitor AFE, isolated DC-DC power, RA8875 TFT controller, USB-C charging, and keyed module harness I/O.' },
      { src: 'img/battery_tester/enclosure_ui.jpg?v=2', title: 'Assembled Tester & Diagnostic Touchscreen UI', caption: '3D-printed bench/handheld enclosure displaying microvolt cell voltages, F1–F5 fuse indicators, T1/T2 NTC thermistor break detection, and QR-encoded test results.' }
    ],
    quadru_diagrams: [
      { src: 'img/quadru/quadru.jpg', title: 'Autonomous Quadruped Robot', caption: 'Full four-legged robot assembly engineered for ABU Robocon 2019.' },
      { src: 'img/quadru/ip.png', title: 'Vision Path-Planning Architecture', caption: 'Image processing & autonomous navigation block diagram on Raspberry Pi.' },
      { src: 'img/quadru/Controller.png', title: 'Attitude & Locomotion Controller', caption: 'Embedded microcontroller & IMU feedback loop governing gait phase.' },
      { src: 'img/quadru/motors.png', title: 'BLDC & ODrive Closed-Loop Actuation', caption: 'High-torque brushless DC motors paired with ODrive controllers for leg positioning.' },
      { src: 'img/quadru/leglength.jpg', title: 'Leg Linkage Kinematics', caption: 'Mechanical linkage and lead-screw actuation geometry.' },
      { src: 'img/quadru/slope.png', title: '15° Incline Climbing Validation', caption: 'Climbing inclinations up to 15 degrees with active IMU pitch compensation.' },
      { src: 'img/quadru/step.png', title: 'Step & Obstacle Traversal', caption: 'Autonomous step hurdle negotiation during testing.' }
    ],
    mahindra_docs: [
      { src: 'img/mahindra/snap.png', title: 'Coordinate-Guided Pick & Place AGV', caption: 'Scaled factory AGV built for Mahindra & Mahindra Engine Plant problem statement.' },
      { src: 'img/mahindra/schematic.jpg', title: 'AGV Electronics & Control Schematic', caption: 'Motor driver, quadrature encoder, IMU, and linear-actuator control schematic.' },
      { src: 'img/Mahindra Certificate.jpg', title: 'Mahindra & Mahindra Recognition', caption: 'Competition certificate from Mahindra & Mahindra Engine Plant challenge.' }
    ],
    rugby_gallery: [
      { src: 'img/rc_20/3.jpg', title: 'ABU Robocon 2020 Dual-Robot System', caption: 'Holonomic passing and pneumatic kicking robots.' },
      { src: 'img/rc_20/1.jpg', title: 'Pass & Pick-and-Place Robot', caption: 'Designed and validated omnidirectional drive and pneumatic gripper subsystem.' },
      { src: 'img/rc_20/2.jpg', title: 'High-Impulse Pneumatic Kick Robot', caption: 'Precision solenoid-timed pneumatic kicking mechanism.' }
    ],
    smart_grid_report: (function () {
      var slides = [
        { src: 'img/aca_project/1.JPG', title: 'Smart Grid Hardware Bench', caption: 'Allen-Bradley PLC, SCADA, NodeMCU & Firebase cloud-integrated prototype.' }
      ];
      for (var p = 1; p <= 14; p++) {
        var num = p < 10 ? '000' + p : '00' + p;
        slides.push({
          src: 'img/sg_report/' + num + '.jpg',
          title: 'Smart Grid Engineering Report — Page ' + p + ' of 14',
          caption: 'System architecture, PLC ladder logic, SCADA screens, and Firebase telemetry.'
        });
      }
      return slides;
    })(),
    siemens_vb: [
      { src: 'img/graph_1.png', title: 'Siemens S7 Real-Time Graphing Suite', caption: 'Custom VB.NET live telemetry waveform plotter and recipe controller.' },
      { src: 'img/graph_2.png', title: 'Visual Studio VB.NET PLC Engine', caption: 'Communication & real-time graphing implementation integrated with TIA Portal.' }
    ],
    mitsu_bems: [
      { src: 'img/mitsu/1.jpg', title: 'Calendar-Driven Building Energy Management System', caption: 'Mitsubishi PLC & HMI panel cutting HVAC and lighting consumption by 10%.' },
      { src: 'img/mitsu/2.jpg', title: 'Control Cabinet & MQTT Gateway', caption: 'Internal control wiring and NodeMCU MQTT schedule synchronization.' }
    ]
  };

  var modal = document.getElementById('noir-modal');
  var modalTitle = document.getElementById('noir-modal-title');
  var modalStage = document.getElementById('noir-modal-stage');
  var modalCaption = document.getElementById('noir-modal-caption-text');
  var modalCounter = document.getElementById('noir-modal-counter');
  var btnPrev = document.getElementById('noir-modal-prev');
  var btnNext = document.getElementById('noir-modal-next');
  var btnClose = document.getElementById('noir-modal-close');

  var currentSlides = [];
  var currentIndex = 0;

  function renderSlide() {
    if (!modal || !currentSlides.length) return;
    var item = currentSlides[currentIndex];
    modalTitle.textContent = item.title || 'Preview';
    modalCaption.textContent = item.caption || '';
    if (currentSlides.length > 1) {
      modalCounter.textContent = (currentIndex + 1) + ' / ' + currentSlides.length;
      btnPrev.style.display = 'inline-block';
      btnNext.style.display = 'inline-block';
    } else {
      modalCounter.textContent = '';
      btnPrev.style.display = 'none';
      btnNext.style.display = 'none';
    }

    modalStage.innerHTML = '';
    if (item.video) {
      var vid = document.createElement('video');
      vid.src = item.video;
      vid.controls = true;
      vid.autoplay = true;
      vid.playsInline = true;
      modalStage.appendChild(vid);
    } else {
      var img = document.createElement('img');
      img.src = item.src;
      img.alt = item.title || '';
      modalStage.appendChild(img);
    }
  }

  function openSlides(slides, idx) {
    currentSlides = slides;
    currentIndex = idx || 0;
    renderSlide();
    modal.classList.add('open');
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    var vids = modalStage.querySelectorAll('video');
    vids.forEach(function (v) { try { v.pause(); } catch (e) {} });
    modalStage.innerHTML = '';
  }

  document.addEventListener('click', function (e) {
    var galleryBtn = e.target.closest('[data-gallery]');
    if (galleryBtn) {
      e.preventDefault();
      var gKey = galleryBtn.getAttribute('data-gallery');
      if (GALLERIES[gKey]) openSlides(GALLERIES[gKey], 0);
      return;
    }

    var mediaBtn = e.target.closest('[data-media-src]');
    if (mediaBtn) {
      e.preventDefault();
      var src = mediaBtn.getAttribute('data-media-src');
      var isVid = /\.mp4$/i.test(src);
      openSlides([{
        src: isVid ? '' : src,
        video: isVid ? src : '',
        title: mediaBtn.getAttribute('data-media-title') || 'Engineering Media',
        caption: mediaBtn.getAttribute('data-media-caption') || ''
      }], 0);
      return;
    }

    if (e.target === modal) closeModal();
  });

  if (btnClose) btnClose.addEventListener('click', closeModal);
  if (btnPrev) btnPrev.addEventListener('click', function () {
    if (!currentSlides.length) return;
    currentIndex = (currentIndex - 1 + currentSlides.length) % currentSlides.length;
    renderSlide();
  });
  if (btnNext) btnNext.addEventListener('click', function () {
    if (!currentSlides.length) return;
    currentIndex = (currentIndex + 1) % currentSlides.length;
    renderSlide();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && dockNav && dockNav.classList.contains('menu-open')) {
      setMobileMenu(false);
    }
    if (!modal || !modal.classList.contains('open')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft' && currentSlides.length > 1) btnPrev.click();
    if (e.key === 'ArrowRight' && currentSlides.length > 1) btnNext.click();
  });

  // 10. Smooth Scroll Reveal
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.06, rootMargin: '0px 0px -24px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }
})();
