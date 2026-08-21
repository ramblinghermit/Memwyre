with open('src/views/LandingPage.vue', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace all section counters from [X/8] to [X/9]
content = content.replace('<div>[1/8]</div>', '<div>[1/9]</div>')
content = content.replace('<div>[2/8]</div>', '<div>[2/9]</div>')
content = content.replace('<div>[3/8]</div>', '<div>[3/9]</div>')
content = content.replace('<div>[4/8]</div>', '<div>[4/9]</div>')
content = content.replace('<div>[5/8]</div>', '<div>[5/9]</div>')
content = content.replace('<div>[6/8]</div>', '<div>[6/9]</div>')
content = content.replace('<div>[7/8]</div>', '<div>[7/9]</div>')
content = content.replace('<div>[8/8]</div>', '<div>[8/9]</div>')

# Format Blog section as section [9/9]
old_blog_header = '''<!-- Blogs Section -->
    <div id="blog-section" data-theme="light" class="pt-16 pb-16 bg-white relative z-25">
      <div class="max-w-7xl mx-auto px-8 sm:px-8 lg:px-12 text-center">
        <!-- Badge -->
        <div class="inline-flex items-center justify-center px-3 py-1 rounded border border-gray-200 text-xs font-semibold text-gray-800 bg-white shadow-sm font-mono tracking-wider mb-6">
          Blogs
        </div>'''

new_blog_header = '''<!-- Blogs Section -->
    <div id="blog-section" data-theme="light" class="relative z-20 pt-0 pb-10 md:pb-16 bg-white">
      <div class="max-w-7xl mx-auto px-8 sm:px-8 lg:px-12 text-center">

        <!-- Sticky Section Header Breadcrumb -->
        <div class="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-gray-300/80 py-3.5 -mx-8 sm:-mx-8 lg:-mx-12 px-8 sm:px-8 lg:px-12 mb-8 md:mb-12">
          <div class="flex justify-between items-center text-xs tracking-wider uppercase font-bold font-mono text-gray-400">
            <div>/ BLOG</div>
            <div>[9/9]</div>
          </div>
        </div>'''

if old_blog_header in content:
    content = content.replace(old_blog_header, new_blog_header)
    print('Replaced blog header successfully!')
else:
    print('Could not find old_blog_header exactly')

with open('src/views/LandingPage.vue', 'w', encoding='utf-8') as f:
    f.write(content)

print('Updated LandingPage.vue with 9 numbered sections!')
